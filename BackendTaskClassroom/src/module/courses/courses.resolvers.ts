import { addCourse, deleteCourse, getCourses, searchCourse, updateCourses } from "./courses.services";

export type Context = {
    u_id: string;
    u_role: string;
}

export const courseResolvers = {
    Query: {
        getCourses: () => {
            return getCourses();
        },
        searchCourse:async(_:any,{c_name}:{c_name:string})=>{
            return searchCourse({c_name})
        }
    },
    Mutation: {
        addCourse: async (_: any, { c_name }: { c_name: string }, context: Context) => {
            return addCourse({ c_name }, context)
        },
        updateCourse: async (_: any, { c_id, c_newName }: { c_id: string, c_newName: string }, context: Context) => {
            return updateCourses({ c_id, c_newName }, context);
        },
        deleteCourse:async(_:any,{c_id}:{c_id:string},context:Context)=>{
            return deleteCourse({c_id},context)
        }
    }
}