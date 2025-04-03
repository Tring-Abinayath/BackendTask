import { ILike, Repository } from "typeorm";
import { Courses } from "./entity/courses.entity";
import { postgresDataSource } from "../../db/dbConnect";
import { Context } from "./courses.resolvers";

const courseRepository: Repository<Courses> = postgresDataSource.getRepository(Courses)

export const getCourses=async()=>{
    try{
        const courses= await courseRepository.find()
        return courses
    }catch(err:any){
        throw new Error(err.message)
    }
}

export const searchCourse=async({c_name}:{c_name:string})=>{
    try{
        const course=await courseRepository.find({where:{cName:ILike(`%${c_name}%`)}})
        return course

    }catch(err:any){
        throw new Error(err.message)
    }
}

export const isAuthorized = async (context: Context) => {
    if (Object.keys(context).length === 0 || context.u_role !== 'admin') {
        throw new Error("Unauthorized")
    }
}

export const isCourse=async({c_id}:{c_id:string})=>{
    const course = await courseRepository.findOne({where:{cId:c_id}})
    if(!course){
        throw new Error("Course not exist")
    }
}

export const addCourse = async ({ c_name }: { c_name: string }, context: Context) => {
    try {
        await isAuthorized(context)
        const course = courseRepository.create({ cName :c_name})
        await courseRepository.save(course)
        return "Course added successfully"
    } catch (err) {
        throw err
    }
}

export const updateCourses = async ({ c_id, c_newName }: { c_id: string, c_newName: string }, context: Context) => {
    try {
        await isAuthorized(context)
        await isCourse({c_id})
        await courseRepository.update({ cId:c_id }, { cName: c_newName })
        return "Course updated successfully"
    } catch (err) {
        throw err
    }
}

export const deleteCourse = async({ c_id }: { c_id: string }, context:Context)=>{
    try{
        await isAuthorized(context)
        await isCourse({c_id})
        await courseRepository.softDelete({cId:c_id})
        return "Course deleted successfully"
    }catch(err){
        throw err
    }
}
