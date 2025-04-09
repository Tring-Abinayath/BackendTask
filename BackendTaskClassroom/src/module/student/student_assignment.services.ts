import { ILike, Repository } from "typeorm";
import { postgresDataSource } from "../../db/dbConnect";
import { StudentAssignment } from "./entity/student_assignment.entity";
import { isAssignment } from "../course_assignment/assignment.services";
import { studAssignmentArgsInput } from "./student_assignment.types";

export const studentAssignmentRepository: Repository<StudentAssignment> = postgresDataSource.getRepository(StudentAssignment)

export const isStudentAssignment = async (getStudAssignmentArgs: studAssignmentArgsInput) => {
    const studAssignment = await studentAssignmentRepository.findOne({
        where: {
            userId: getStudAssignmentArgs.u_id,
            saId: getStudAssignmentArgs.sa_id
        }
    })
    if (!studAssignment) {
        throw new Error("Student Assignment not found")
    }
}

export const getStudentAssignment = async (studAssignmentArgs: studAssignmentArgsInput) => {
    const page = studAssignmentArgs.page ? studAssignmentArgs.page : 1
    const pageSize = studAssignmentArgs.pageSize ? studAssignmentArgs.pageSize : 10
    const searchAssignment = studAssignmentArgs.sa_upload ? studAssignmentArgs.sa_upload : ""
    const skip = (page - 1) * pageSize
    try {
        const studAssignment = await studentAssignmentRepository.find({
            where: {
                userId: studAssignmentArgs.u_id,
                saUpload: ILike(`%${searchAssignment}%`)
            },
            take: pageSize,
            skip
        })

        return studAssignment.map(assignment => {
            return {
                sa_id: assignment.saId,
                u_id: assignment.userId,
                a_id: assignment.assignmentId,
                sa_upload: assignment.saUpload
            }
        })

    } catch (err: any) {
        throw new Error(err.message)
    }
}


export const uploadAssignment = async (studAssignmentArgs: studAssignmentArgsInput) => {
    try {
        await isAssignment(studAssignmentArgs.a_id)
        const uploadAssignment = studentAssignmentRepository.create({
            userId: studAssignmentArgs.u_id,
            assignmentId: studAssignmentArgs.a_id,
            saUpload: "studentAssignments/" + studAssignmentArgs.sa_upload
        })
        await studentAssignmentRepository.save(uploadAssignment)
        return "Assignment uploaded successfully"
    } catch (err: any) {
        throw new Error(err.message)
    }
}

export const updateStudentAssignment = async (studAssignmentArgs: studAssignmentArgsInput) => {
    try {
        await isStudentAssignment(studAssignmentArgs)
        await studentAssignmentRepository.update({
            userId: studAssignmentArgs.u_id,
            assignmentId:studAssignmentArgs.a_id
            },
            {
                saUpload: "studentAssignments/"+studAssignmentArgs.sa_uploadNew
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
        await studentAssignmentRepository.softDelete({
            saId:studAssignmentArgs.sa_id,
            userId:studAssignmentArgs.u_id,
            assignmentId:studAssignmentArgs.a_id,
        })
        return "Student Assignment deleted successfully"
    } catch (err: any) {
        throw new Error(err.message)
    }
}