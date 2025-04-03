import { Repository } from "typeorm";
import { CourseMaterial } from "./entity/course_material.entity";
import { postgresDataSource } from "../../db/dbConnect";
import { Context } from "./courses.resolvers";
import { isAuthorized, isCourse } from "./courses.services";
import { Courses } from "./entity/courses.entity";

const courseRepository: Repository<Courses> = postgresDataSource.getRepository(Courses)

const courseMaterial:Repository<CourseMaterial>=postgresDataSource.getRepository(CourseMaterial)

export const getCourseMaterial=async({c_id}:{c_id:string})=>{
    try{
        await isCourse({c_id})
        const courseMaterials = await courseMaterial.find({
            where: { 
                course: { 
                    cId: c_id 
            } },
            relations: ["course"]
        });

        console.log(courseMaterials);

        if (courseMaterials.length === 0) {
            return { message: "No course materials found for this course" };
        }
        return courseMaterials; 
    }catch(err:any){
        throw new Error(err.message)
    }
}

export const addCourseMaterial=async({c_id,c_mat_upload}:{c_id:string,c_mat_upload:string},context:Context)=>{
    try{
        await isAuthorized(context)
        await isCourse({c_id})
        const getCourse=await courseRepository.find({where:{cId:c_id}})
        console.log("Getcourse:",getCourse)
        const material=courseMaterial.create({cMatUpload:c_mat_upload})
        console.log("Material:",material)
        await courseMaterial.save(material)
        return "Course material added successfully"
    }catch(err:any){
        throw new Error(err.message)
    }
}