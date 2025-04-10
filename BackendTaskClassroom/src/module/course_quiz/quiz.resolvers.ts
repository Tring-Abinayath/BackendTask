import { Context } from "../courses/courses.resolvers"
import { isAuthorized } from "../courses/courses.services"
import { userRole } from "../user/entity/user.entity"
import { addQuiz, deleteQuiz, submitQuiz } from "./quiz.services"

type CreateQuestionInput = {
    qn_name: string,
    options: CreateOptionsInput[]
}
type CreateOptionsInput = {
    option: string,
    is_answer: boolean
}

export type quizArgsTypes = {
    c_id: string,
    qb_name: string,
    questions: CreateQuestionInput[]
}
type QnAnsType = {
    qnId: string,
    answerId: string
}
export type submitQuizArgsType = {
    qb_id: string,
    question_answer: QnAnsType[]
}

export const quizResolvers = {
    Mutation: {
        addQuiz: async (_: any, quizArgs: quizArgsTypes, context: Context) => {
            try {
                await isAuthorized(context, [userRole.Admin])
                return addQuiz(quizArgs)
            } catch (err: any) {
                throw new Error(err.message)
            }
        },
        submitQuiz: async (_: any, submitQuizArgs: submitQuizArgsType, context: Context) => {
            try {
                await isAuthorized(context, [userRole.Student])
                return submitQuiz(submitQuizArgs, context.u_id)
            } catch (err: any) {
                throw new Error(err.message)
            }
        },
        deleteQuiz: async (_: any, {qb_id}: {qb_id:string}, context: Context) => {
            try {
                await isAuthorized(context, [userRole.Admin])
                return deleteQuiz({qb_id})
            } catch (err: any) {
                throw new Error(err.message)
            }
        }
    }
}