import { ILike, Repository } from "typeorm";
import { Courses } from "./entity/courses.entity";
import { postgresDataSource } from "../../db/dbConnect";
import { addCourse, deleteCourse, updateCourses } from "./courses.services";

export type Context = {
    u_id: string;
    u_role: string;
}

const courseRepository: Repository<Courses> = postgresDataSource.getRepository(Courses);

export const courseResolvers = {
    Query: {
        getCourses: async () => {
            return await courseRepository.find();
        },
        searchCourse:async(_:any,{c_name}:{c_name:string})=>{
            const courses=await courseRepository.find({where:{c_name:ILike(`%${c_name}%`)}})
            return courses
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