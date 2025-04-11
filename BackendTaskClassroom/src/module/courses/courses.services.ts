import { ILike, Repository } from "typeorm";
import { Courses } from "./entity/courses.entity";
import { postgresDataSource } from "../../db/dbConnect";
import { Context } from "./courses.resolvers";
import { userRole } from "../user/entity/user.entity";
import { updateCourseArgsType } from "./courses.types";
import { getPaginationArgsInput } from "../user/user.resolvers";

export const courseRepository: Repository<Courses> = postgresDataSource.getRepository(Courses)

export const getCourses=async(getUserArgs:getPaginationArgsInput)=>{
    const page=getUserArgs.page?getUserArgs.page:1
    const pageSize=getUserArgs.pageSize?getUserArgs.pageSize:10
    const search=getUserArgs.c_name?getUserArgs.c_name:""
    const skip=(page-1)*pageSize
    try{
        return courseRepository.find({
            where:{
                cName:ILike(`%${search}%`)
            },
            take:pageSize,
            skip,
        })
    }catch(err:any){
        throw new Error(err.message)
    }
}

export const searchCourse=async({c_name}:{c_name:string})=>{
    try{
        return courseRepository.find({where:{cName:ILike(`%${c_name}%`)}})
    }catch(err:any){
        throw new Error(err.message)
    }
}

export const isAuthorized = async (context: Context,authorizedRole:userRole[]) => {
    if (Object.keys(context).length === 0 || !authorizedRole.includes(context.u_role as userRole)) {
        throw new Error("Unauthorized")
    }
}

export const isCourse=async(cId:string)=>{
    const course = await courseRepository.findOne({where:{cId}})
    if(!course){
        throw new Error("Course not exist")
    }
}

export const addCourse = async ({ c_name }: { c_name: string }) => {
    try {
        const courses=await courseRepository.find({where:{cName:c_name.toLowerCase()}})
        console.log(courses)
        if(courses.length>0){
            throw new Error("Course already exist")
        }
        const course = courseRepository.create({ cName :c_name.toLowerCase()})
        await courseRepository.save(course)
        return "Course added successfully"
    } catch (err:any) {
        console.log(err)
        throw err
    }
}

export const updateCourses = async (updateCourseArgs: updateCourseArgsType) => {
    try {
        const { c_id, c_newName }=updateCourseArgs
        await isCourse(c_id)
        await courseRepository.update({ cId:c_id }, { cName: c_newName })
        return "Course updated successfully"
    } catch (err:any) {
        console.log(err)
        throw err
    }
}

export const deleteCourse = async( cId : string )=>{
    try{
        await isCourse(cId)
        await courseRepository.softDelete({cId})
        return "Course deleted successfully"
    }catch(err:any){
        console.log(err)
        throw err
    }
}
