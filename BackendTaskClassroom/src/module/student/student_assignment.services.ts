import { ILike, Repository } from "typeorm";
import { postgresDataSource } from "../../db/dbConnect";
import { StudentAssignment } from "./entity/student_assignment.entity";
import { isAssignment } from "../course_assignment/assignment.services";
import { studAssignmentArgsInput } from "./student_assignment.types";

export const studentAssignmentRepository: Repository<StudentAssignment> = postgresDataSource.getRepository(StudentAssignment)

export const isStudentAssignment = async (getStudAssignmentArgs: studAssignmentArgsInput) => {
    const studAssignment = await studentAssignmentRepository.findOne({
        where: {
            userId: getStudAssignmentArgs.userId,
            saId: getStudAssignmentArgs.saId
        }
    })
    if (!studAssignment) {
        throw new Error("Student Assignment not found")
    }
}

export const getStudentAssignment = async (studAssignmentArgs: studAssignmentArgsInput) => {
    const page = studAssignmentArgs.page ? studAssignmentArgs.page : 1
    const pageSize = studAssignmentArgs.pageSize ? studAssignmentArgs.pageSize : 10
    const searchAssignment = studAssignmentArgs.saUpload ? studAssignmentArgs.saUpload : ""
    const skip = (page - 1) * pageSize
    try {
        const studAssignment = await studentAssignmentRepository.find({
            where: {
                userId: studAssignmentArgs.userId,
                saUpload: ILike(`%${searchAssignment}%`)
            },
            take: pageSize,
            skip
        })
        return studAssignment
    } catch (err: any) {
        throw new Error(err.message)
    }
}


export const uploadAssignment = async (studAssignmentArgs: studAssignmentArgsInput) => {
    try {
        await isAssignment(studAssignmentArgs.assignmentId)
        console.log(studAssignmentArgs)
        const uploadAssignment = studentAssignmentRepository.create(
            {
                ...studAssignmentArgs,
                saUpload: "studentAssignments/" + studAssignmentArgs.saUpload
            }
        )
        await studentAssignmentRepository.save(uploadAssignment)
        return "Assignment uploaded successfully"
    } catch (err: any) {
        throw new Error(err.message)
    }
}

export const updateStudentAssignment = async (studAssignmentArgs: studAssignmentArgsInput) => {
    try {
        await isStudentAssignment(studAssignmentArgs)
        await studentAssignmentRepository.update(
            {
                userId: studAssignmentArgs.userId,
                assignmentId: studAssignmentArgs.assignmentId
            },
            {
                saUpload: "studentAssignments/" + studAssignmentArgs.saUploadNew
            }
        )
        return "Student Assignment updated successfully"

    } catch (err: any) {
        throw new Error(err.message)
    }
}

export const deleteStudentAssignment = async (studAssignmentArgs: studAssignmentArgsInput) => {
    try {
        await isStudentAssignment(studAssignmentArgs)
        await studentAssignmentRepository.softDelete(studAssignmentArgs)
        return "Student Assignment deleted successfully"
    } catch (err: any) {
        throw new Error(err.message)
    }
}