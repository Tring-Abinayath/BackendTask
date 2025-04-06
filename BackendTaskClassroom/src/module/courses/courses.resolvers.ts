import { userRole } from "../user/entity/user.entity";
import { addCourse, deleteCourse, getCourses, isAuthorized, searchCourse, updateCourses } from "./courses.services";
import { updateCourseArgsType } from "./courses.types";

export type Context = {
    u_id: string;
    u_role: string;
}

export const courseResolvers = {
    Query: {
        getCourses: async(_:any,_args:any,context:Context) => {
            try{
                await isAuthorized(context,[userRole.Admin,userRole.Student])
                return getCourses();
            }catch(err:any){
                throw new Error(err.message)
            }
        },
        searchCourse:async(_:any,{c_name}:{c_name:string},context:Context)=>{
            try{
                await isAuthorized(context,[userRole.Admin,userRole.Student])
                return searchCourse({c_name})
            }catch(err:any){
                throw new Error(err.message)
            }
        }
    },
    Mutation: {
        addCourse: async (_: any, { c_name }: { c_name: string }, context: Context) => {
            try{
                await isAuthorized(context,[userRole.Admin])
                return addCourse({ c_name })
            }catch(err:any){
                throw new Error(err.message)
            }
        },
        updateCourse: async (_: any, updateCourseArgs: updateCourseArgsType, context: Context) => {
            try{
                await isAuthorized(context,[userRole.Admin])
                return updateCourses(updateCourseArgs);
            }catch(err:any){
                throw new Error(err.message)
            }
        },
        deleteCourse:async(_:any,{c_id}:{c_id:string},context:Context)=>{
            try{
                await isAuthorized(context,[userRole.Admin])
                return deleteCourse({c_id})
            }catch(err:any){
                throw new Error(err.message)
            }
        }
    }
}