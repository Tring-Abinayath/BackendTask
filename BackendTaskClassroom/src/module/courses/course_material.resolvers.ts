import { userRole } from "../user/entity/user.entity";
import { addCourseMaterial, deleteCourseMaterial, getCourseMaterial, updateCourseMaterial } from "./course_material.services";
import { addCourseMaterialArgsType, deleteCourseMaterialArgsType, getCourseMaterialArgsType, updateCourseMaterialArgsType } from "./course_material.types";
import { Context } from "./courses.resolvers";
import { isAuthorized } from "./courses.services";

export const courseMaterialResolvers = {
    Query: {
        getCourseMaterial: async(_: any, getCourseMaterialArgs: getCourseMaterialArgsType ,context:Context) => {
            try {
                await isAuthorized(context, [userRole.Admin, userRole.Student])
                return getCourseMaterial(getCourseMaterialArgs)
            } catch (err: any) {
                throw new Error(err.message)
            }
        }
    },
    Mutation: {
        addCourseMaterial: async(_: any, addCourseMaterialArgs: addCourseMaterialArgsType, context: Context) => {
            try {
                await isAuthorized(context, [userRole.Admin])
                return addCourseMaterial(addCourseMaterialArgs)
            } catch (err: any) {
                throw new Error(err.message)
            }
        },
        updateCourseMaterial:async (_: any,updateCourseMaterialArgs: updateCourseMaterialArgsType, context: Context) => {
            try {
                await isAuthorized(context, [userRole.Admin])
                return updateCourseMaterial(updateCourseMaterialArgs)
            } catch (err: any) {
                throw new Error(err.message)
            }
        },
        deleteCourseMaterial: async(_: any, deleteCourseMaterialArgs: deleteCourseMaterialArgsType, context: Context) => {
            try {
                await isAuthorized(context, [userRole.Admin])
                return deleteCourseMaterial(deleteCourseMaterialArgs)
            } catch (err: any) {
                throw new Error(err.message)
            }
        }
    }
}
