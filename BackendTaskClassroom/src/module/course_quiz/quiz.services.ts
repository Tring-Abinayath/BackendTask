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

export const getQuiz=async(getQuizArgs:getQuizArgsInput)=>{
    const pageSize=getQuizArgs.pageSize?getQuizArgs.pageSize:10
    const page=getQuizArgs.page?getQuizArgs.page:1
    const skip=(page-1)*pageSize
    const searchQb=getQuizArgs.searchQb?getQuizArgs.searchQb:""
    try{
        const qn_bank=await qnBankRepository.find({
            where:{
                courseId:getQuizArgs.c_id,
                qbName:ILike(`%${searchQb}%`)
            },
            relations:["question","question.option"],
            take:pageSize,
            skip
        });

        const quiz=qn_bank.map(qb=>{
            return{
                qb_id:qb.qbId,
                qb_name:qb.qbName,
                questions:qb.question
                .filter(qn=>qn.answer)
                .map(qn=>{
                    return {
                        qn_id:qn.qnId,
                        qn:qn.qn,
                        options:qn.option.map(option=>{
                            return {
                                op_id:option.opId,
                                option:option.option
                            }
                        })
                    }
                }),
            }
        })
        return quiz
        
    }catch(err:any){
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

        console.log("Given updated quiz:",JSON.stringify(  quizArgs))

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
            relations:["question"]
        })

        if (!qb) {
            throw new Error("Quiz not exist")
        }

        console.log("Given updated quiz:",JSON.stringify(  quizUpdateArgs))

        const questions = quizUpdateArgs.questions.map(quizArgsqn => {
            return {
                qn: quizArgsqn.qn_name,
                option: quizArgsqn.options.map(op => {
                    return {
                        option: op.option
                    }
                })
            }
        })
        console.log("new QbName:",quizUpdateArgs.qb_name)
        console.log("Updated Questions:",questions)

        await quizRepository.update({qbId:quizUpdateArgs.qb_id},{
            courseId: quizUpdateArgs.c_id,
            qbName: quizUpdateArgs.qb_name.toLowerCase(),
            question: questions
        })

        const answers = quizUpdateArgs.questions.map((args: any) => {
            const options = args.options.filter((option: any) => option.is_answer === true)
            return {
                question: args.qn_name,
                answer: options.map((option: any) => option.option)[0]
            }

        })

        const updateQnTable = answers.map(async (answer) => {
            const result = await optionRepository.find({ where: { option: answer.answer } });
            for (const optionEntity of result) {
                await qnRepository.update(
                    { qnId: optionEntity.questionId },
                    { answer: optionEntity.opId }
                );
            }
        });

        console.log("Final:",await qnBankRepository.find())
        await queryRunner.commitTransaction()
        return "Quiz updated successfully"
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
            const qnEntity = await qnRepository.find({ where: { qnId: qnAns.qnId, answer: qnAns.answerId } })
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

export const deleteQuiz = async ( qb_id : string ) => {
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