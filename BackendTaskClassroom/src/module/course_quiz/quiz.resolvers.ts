import { Context } from "../courses/courses.resolvers"
import { isAuthorized } from "../courses/courses.services"
import { userRole } from "../user/entity/user.entity"
import { addQuiz, deleteQuiz, getQuiz, submitQuiz, updateQuiz } from "./quiz.services"
import { getQuizArgsInput, quizArgsTypes, quizUpdateArgsTypes, submitQuizArgsType } from "./quiz.types"


export const quizResolvers = {
    Query:{
        getQuiz:async(_: any,getQuizArgs:getQuizArgsInput,context: Context)=>{
            try {
                
                await isAuthorized(context, [userRole.Admin,userRole.Student])
                return getQuiz(getQuizArgs)
            } catch (err: any) {
                throw new Error(err.message)
            }
        }
    },
    Mutation: {
        addQuiz: async (_: any, quizArgs: quizArgsTypes, context: Context) => {
            try {
                
                await isAuthorized(context, [userRole.Admin])
                return addQuiz(quizArgs)
            } catch (err: any) {
                throw new Error(err.message)
            }
        },
        updateQuiz: async (_: any, quizUpdateArgs: quizUpdateArgsTypes, context: Context) => {
            try {
                await isAuthorized(context, [userRole.Admin])
                return updateQuiz(quizUpdateArgs)
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
                return deleteQuiz(qb_id)
            } catch (err: any) {
                throw new Error(err.message)
            }
        }
    }
}
