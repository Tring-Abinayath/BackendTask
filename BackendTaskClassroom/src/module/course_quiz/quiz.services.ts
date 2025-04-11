import { ILike, Repository } from "typeorm";
import { QnBank } from "./entity/qn_bank.entity";
import { postgresDataSource } from "../../db/dbConnect";
import { StudentScore } from "../student/entity/student_score.entity";
import { Questions } from "./entity/questions.entity";
import { Options } from "./entity/options.entity";
import { getQuizArgsInput, quizArgsTypes, quizUpdateArgsTypes, submitQuizArgsType } from "./quiz.types";
const qnRepository: Repository<Questions> = postgresDataSource.getRepository(Questions)
const optionRepository: Repository<Options> = postgresDataSource.getRepository(Options)
const qnBankRepository: Repository<QnBank> = postgresDataSource.getRepository(QnBank)
export const studentScoreRepository: Repository<StudentScore> = postgresDataSource.getRepository(StudentScore)

export const getQuiz = async (getQuizArgs: getQuizArgsInput) => {
    const pageSize = getQuizArgs.pageSize ? getQuizArgs.pageSize : 10
    const page = getQuizArgs.page ? getQuizArgs.page : 1
    const skip = (page - 1) * pageSize
    const searchQb = getQuizArgs.searchQb ? getQuizArgs.searchQb : ""
    try {
        const qnBank = await qnBankRepository.find({
            where: {
                courseId: getQuizArgs.c_id,
                qbName: ILike(`%${searchQb}%`)
            },
            relations: ["question", "question.option"],
            take: pageSize,
            skip
        });

        return qnBank.map(qb => {
            return {
                qb_id: qb.qbId,
                qb_name: qb.qbName,
                questions: qb.question
                    .filter(qn => qn.answer)
                    .map(qn => {
                        return {
                            qn_id: qn.qnId,
                            qn: qn.qn,
                            options: qn.option.map(option => {
                                return {
                                    op_id: option.opId,
                                    option: option.option
                                }
                            })
                        }
                    }),
            }
        })

    } catch (err: any) {
        throw new Error(err.message)
    }
}

export const addQuiz = async (quizArgs: quizArgsTypes) => {
    const queryRunner = postgresDataSource.createQueryRunner()
    try {
        await queryRunner.connect()
        await queryRunner.startTransaction()
        const quizRepository: Repository<QnBank> = queryRunner.manager.getRepository(QnBank);
        const qb = await quizRepository.findOne({
            where: {
                qbName: quizArgs.qb_name.toLowerCase()
            },
        })

        if (qb) {
            throw new Error("Quiz already exist")
        }
        
        const questions = quizArgs.questions.map(qnArgs => {
            return {
                qn: qnArgs.qn_name,
                option: qnArgs.options.map(op => {
                    return {
                        option: op.option
                    }
                })
            }
        })


        const quiz = quizRepository.create({
            courseId: quizArgs.c_id,
            qbName: quizArgs.qb_name.toLowerCase(),
            question: questions
        })

        await quizRepository.save(quiz)

        const answers = quizArgs.questions.map((args: any) => {
            const options = args.options.filter((option: any) => option.is_answer === true)
            if(options.length===0){
                throw new Error("Please provide answer for all the questions")
            }
            return {
                question: args.qn_name,
                answer: options.map((option: any) => option.option)[0]
            }

        })

        answers.forEach(async(answer:any) => {
            const result = await optionRepository.find({ where: { option: answer.answer } })
            result.forEach(async (optionEntity) => {
                await qnRepository.update(
                    { qnId: optionEntity.questionId },
                    { answer: optionEntity.opId }
                );
            });

        })
        await queryRunner.commitTransaction()
        return "Quiz added successfully"
    } catch (err: any) {
        await queryRunner.rollbackTransaction()
        throw new Error(err.message)
    } finally {
        await queryRunner.release()
    }
}

export const updateQuiz = async (quizUpdateArgs: quizUpdateArgsTypes) => {
    const queryRunner = postgresDataSource.createQueryRunner()
    try {
        await queryRunner.connect()
        await queryRunner.startTransaction()
        const quizRepository: Repository<QnBank> = queryRunner.manager.getRepository(QnBank);
        const qb = await quizRepository.findOne({
            where: {
                qbId: quizUpdateArgs.qb_id
            },
            relations: ["question"]
        })

        if (!qb) {
            throw new Error("Quiz not exist")
        }

        quizUpdateArgs.questions.forEach(quizArgsqn => {
            return {
                qn_id: quizArgsqn.qn_id,
                qn: quizArgsqn.qn_name,
                option: quizArgsqn.options.map(op => {
                    return {
                        op_id: op.op_id,
                        option: op.option
                    }
                })
            }
        })

        await quizRepository.update({ qbId: quizUpdateArgs.qb_id }, {
            courseId: quizUpdateArgs.c_id,
            qbName: quizUpdateArgs.qb_name.toLowerCase(),
        })

        quizUpdateArgs.questions.forEach(async quizArgsqn => {
            return qnRepository.update(
                { qnId: quizArgsqn.qn_id },
                {
                    qn: quizArgsqn.qn_name,
                }
            );
        });

        quizUpdateArgs.questions.forEach(async qn => {
            qn.options.forEach(async op => {
                await optionRepository.update(
                    {opId: op.op_id},
                    {
                        option:op.option
                    }
                )
            })
        })

        const answers = quizUpdateArgs.questions.map((args: any) => {
            const options = args.options.filter((option: any) => option.is_answer === true)
            if(options.length===0){
                throw new Error("Please provide answer for all the questions")
            }
            return {
                question: args.qn_name,
                answer: options.map((option: any) => option.option)[0]
            }

        })

        answers.forEach(async (answer) => {
            const result = await optionRepository.find({ where: { option: answer.answer } });
            for (const optionEntity of result) {
                await qnRepository.update(
                    { qnId: optionEntity.questionId },
                    { answer: optionEntity.opId }
                );
            }
        });
        await queryRunner.commitTransaction()
        return "Quiz updated successfully"
    } catch (err: any) {
        await queryRunner.rollbackTransaction()
        throw new Error(err.message)
    } finally {
        await queryRunner.release()
    }
}

export const submitQuiz = async (submitQuizArgs: submitQuizArgsType, uId: string) => {

    try {
        const qb = await qnBankRepository.findOne({ where: { qbId: submitQuizArgs.qb_id } })
        if (!qb) {
            throw new Error("QnBank not exist")
        }

        let score = 0;
        for (const qnAns of submitQuizArgs.question_answer) {
            const qnEntity = await qnRepository.find({ where: { qnId: qnAns.qnId, answer: qnAns.answerId } })
            if (qnEntity.length) {
                score++
            }
        }

        await studentScoreRepository.upsert({
            qbId: submitQuizArgs.qb_id,
            userId: uId,
            score: score.toString()
        }, ['qbId', 'userId'])

        return {
            qb_id: submitQuizArgs.qb_id,
            score
        }

    } catch (err: any) {
        throw new Error(err.message)
    }
}

export const deleteQuiz = async (qbId: string) => {
    try {
        const qb = await qnBankRepository.findOne({
            where: {
                qbId
            },
            relations:['question','question.option']
        })
        if (!qb) {
            throw new Error("Quiz not found")
        }

        const scoreQb = await studentScoreRepository.findOne({
            where: {
                qbId
            }
        })
        if (scoreQb) {
            throw new Error("Quiz already taken by a user, cannot delete")
        }

         for (const question of qb.question) {
            if (question.option && question.option.length > 0) {
                await optionRepository.softDelete({ questionId: question.qnId });
            }
        }

        for (const question of qb.question) {
            await qnRepository.softDelete({ qnId: question.qnId });
        }
        await qnBankRepository.softDelete({ qbId })
        
        return "Quiz deleted successfully"
    } catch (err: any) {
        throw new Error(err.message)
    }
}
