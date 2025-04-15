import { Repository } from "typeorm";
import { quizArgsTypes, submitQuizArgsType } from "./quiz.resolvers";
import { QnBank } from "./entity/qn_bank.entity";
import { postgresDataSource } from "../../db/dbConnect";
import { StudentScore } from "../student/entity/student_score.entity";
import { Questions } from "./entity/questions.entity";
import { Options } from "./entity/options.entity";
const qnRepository: Repository<Questions> = postgresDataSource.getRepository(Questions)
const optionRepository: Repository<Options> = postgresDataSource.getRepository(Options)
const qnBankRepository: Repository<QnBank> = postgresDataSource.getRepository(QnBank)
const studentScoreRepository: Repository<StudentScore> = postgresDataSource.getRepository(StudentScore)

export const isQnBank = async (quizRepository: Repository<QnBank>, qb_name: string) => {
    const qb = await quizRepository.findOne({
        where: {
            qbName: qb_name
        },
    })

    if (qb) {
        throw new Error("Quiz already exist")
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

        const questions = quizArgs.questions.map(quizArgs => {
            return {
                qn: quizArgs.qn_name,
                option: quizArgs.options.map(op => {
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
            return {
                question: args.qn_name,
                answer: options.map((option: any) => option.option)[0]
            }

        })

        const updateQnTable = answers.map(async (answer) => {
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

export const submitQuiz = async (submitQuizArgs: submitQuizArgsType, u_id: string) => {

    try {
        const qb = await qnBankRepository.findOne({ where: { qbId: submitQuizArgs.qb_id } })
        if (!qb) {
            throw new Error("QnBank not exist")
        }

        let score = 0;
        for (let qnAns of submitQuizArgs.question_answer) {
            console.log(qnAns)
            const qnEntity = await qnRepository.find({ where: { qnId: qnAns.qnId, answer: qnAns.answerId } })
            console.log(qnEntity)
            if (qnEntity.length) {
                score++
            }
        }

        await studentScoreRepository.upsert({
            qbId: submitQuizArgs.qb_id,
            userId: u_id,
            score: score.toString()
        }, ['qbId', 'userId'])

        return {
            qb_id: submitQuizArgs.qb_id,
            score: score
        }

    } catch (err: any) {
        throw new Error(err.message)
    }
}

export const deleteQuiz = async ({ qb_id }: { qb_id: string }) => {
    try {
        const qb = await qnBankRepository.findOne({
            where: {
                qbId: qb_id
            },
        })
        if (!qb) {
            throw new Error("Quiz not found")
        }

        const scoreQb = await studentScoreRepository.findOne({
            where: {
                qbId: qb_id
            }
        })
        if (scoreQb) {
            throw new Error("Quiz already taken by a user, cannot delete")
        }
        await qnBankRepository.softDelete({ qbId: qb_id })
        return "Quiz deleted successfully"
    } catch (err: any) {
        throw new Error(err.message)
    }
}