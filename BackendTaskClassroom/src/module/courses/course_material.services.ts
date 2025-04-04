import { Repository } from "typeorm";
import { CourseMaterial } from "./entity/course_material.entity";
import { postgresDataSource } from "../../db/dbConnect";
import { Context } from "./courses.resolvers";
import { isAuthorized, isCourse } from "./courses.services";
import { Courses } from "./entity/courses.entity";
import { downloadFromS3 } from "../../s3/s3";

const courseRepository: Repository<Courses> = postgresDataSource.getRepository(Courses)

const courseMaterial: Repository<CourseMaterial> = postgresDataSource.getRepository(CourseMaterial)

export const getCourseMaterial = async ({ c_id,bucket }: { c_id: string,bucket:string }) => {
    try {
        await isCourse({ c_id })
        const courseMaterials = await courseMaterial.find({
            where: {
                course: {
                    cId: c_id
                }
            },
            relations: ["course"]
        });

        if (courseMaterials.length === 0) {
            throw new Error("No course materials found for this course");
        }

        const getMaterials=courseMaterials.map(async(material) => {
            const signedUrl=await downloadFromS3(bucket,material.cMatUpload)
            return {
                cMatId: material.cMatId,
                cMatUpload: material.cMatUpload,
                cId: material.course.cId,
                url:signedUrl
            }
            });

        return getMaterials;

    } catch (err: any) {
        throw new Error(err.message)
    }
}

export const addCourseMaterial = async ({ c_id, c_mat_upload }: { c_id: string, c_mat_upload: string }, context: Context) => {
    try {
        await isAuthorized(context)
        await isCourse({ c_id })
        const getCourse = await courseRepository.find({ where: { cId: c_id } })
        const material = courseMaterial.create({ cMatUpload: "materials/"+c_mat_upload, course: getCourse[0] })
        await courseMaterial.save(material)
        return "Course material added successfully"
    } catch (err: any) {
        throw new Error(err.message)
    }
}

export const isMaterial=async({ c_mat_id, c_id}: { c_mat_id: string, c_id: string})=>{
    const materials = await courseMaterial.findOne({
        where: {
            cMatId: c_mat_id,
            course: {
                cId: c_id
            }
        },
        relations: ["course"]
    });

    if(!materials){
        throw new Error("No materials found")
    }
}

export const updateCourseMaterial = async ({ c_mat_id, c_id, c_mat_newUpload }: { c_mat_id: string, c_id: string, c_mat_newUpload: string }, context: Context) => {
    try {
        await isAuthorized(context)
        await isMaterial({c_mat_id,c_id})
        await courseMaterial.update({cMatId:c_mat_id},{cMatUpload:c_mat_newUpload})
        return "Course material updated successfully"

    } catch (err: any) {
        throw new Error(err.message)
    }
}

export const deleteCourseMaterial = async ({ c_mat_id,c_id }: { c_mat_id: string,c_id:string}, context: Context) => {
    try{
        await isAuthorized(context)
        await isMaterial({c_mat_id,c_id})
        await courseMaterial.softDelete({cMatId:c_mat_id})
        return "Course material deleted successfully"
    }catch(err:any){
        throw new Error(err.message)
    }
}