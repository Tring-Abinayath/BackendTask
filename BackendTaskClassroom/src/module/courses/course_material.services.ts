import { ILike, Repository } from "typeorm";
import { CourseMaterial } from "./entity/course_material.entity";
import { postgresDataSource } from "../../db/dbConnect";
import { courseRepository, isCourse } from "./courses.services";
import { downloadFromS3 } from "../../s3/s3";
import { addCourseMaterialArgsType, deleteCourseMaterialArgsType, getCourseMaterialArgsType, isMaterialArgsType, updateCourseMaterialArgsType } from "./course_material.types";

const courseMaterial: Repository<CourseMaterial> = postgresDataSource.getRepository(CourseMaterial)

export const getCourseMaterial = async (getCourseMaterialArgs: getCourseMaterialArgsType) => {
    try {
        const { c_id, bucket } = getCourseMaterialArgs
        await isCourse(c_id)
        const page = getCourseMaterialArgs.page
        const pageSize = getCourseMaterialArgs.pageSize
        const searchCourse = getCourseMaterialArgs.courseMaterialName
        const skip = (page - 1) * pageSize
        const courseMaterials = await courseMaterial.find({
            where: {
                course: {
                    cId: c_id
                },
                cMatUpload: ILike(`%${searchCourse}%`)

            },
            relations: ["course"],
            take: pageSize,
            skip
        });

        if (courseMaterials.length === 0) {
            throw new Error("No course materials found for this course");
        }

        const getMaterials = await Promise.all(courseMaterials.map(async (material) => {
            const signedUrl = await downloadFromS3(bucket, material.cMatUpload)
            try{
                return {
                    cMatId: material.cMatId,
                    cMatUpload: material.cMatUpload,
                    cId: material.course.cId,
                    url: signedUrl.url
                }

            }catch(err:any){
                throw new Error(err.message)
            }
        }));
        return getMaterials;

    } catch (err: any) {
        throw new Error(err.message)
    }
}

export const addCourseMaterial = async (addCourseMaterialArgs: addCourseMaterialArgsType) => {
    try {
        const { c_id, c_mat_upload } = addCourseMaterialArgs
        await isCourse(c_id)
        await courseRepository.find({ where: { cId: c_id } })
        const material = courseMaterial.create({ cMatUpload: "materials/" + c_mat_upload, courseId: c_id })
        await courseMaterial.save(material)
        return "Course material added successfully"
    } catch (err: any) {
        throw new Error(err.message)
    }
}

export const isMaterial = async (isMaterialArgs: isMaterialArgsType) => {
    const { c_mat_id, c_id } = isMaterialArgs
    const materials = await courseMaterial.findOne({
        where: {
            cMatId: c_mat_id,
            course: {
                cId: c_id
            }
        },
        relations: ["course"]
    });

    if (!materials) {
        throw new Error("No materials found")
    }
}

export const updateCourseMaterial = async (updateCourseMaterialArgs: updateCourseMaterialArgsType) => {
    try {
        const { c_mat_id, c_id, c_mat_newUpload } = updateCourseMaterialArgs
        await isMaterial({ c_mat_id, c_id })
        await courseMaterial.update({ cMatId: c_mat_id }, { cMatUpload: c_mat_newUpload })
        return "Course material updated successfully"

    } catch (err: any) {
        throw new Error(err.message)
    }
}

export const deleteCourseMaterial = async (deleteCourseMaterialArgs: deleteCourseMaterialArgsType) => {
    try {
        const { c_mat_id, c_id } = deleteCourseMaterialArgs
        await isMaterial({ c_mat_id, c_id })
        await courseMaterial.softDelete({ cMatId: c_mat_id })
        return "Course material deleted successfully"
    } catch (err: any) {
        throw new Error(err.message)
    }
}