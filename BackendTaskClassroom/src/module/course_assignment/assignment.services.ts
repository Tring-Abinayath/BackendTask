import { Repository } from "typeorm"
import { Assignment } from "./entity/assignment.entity"
import { postgresDataSource } from "../../db/dbConnect"
import { isCourse } from "../courses/courses.services"
import { assignmentArgsType, updateAssignmentArgsType } from "./assignment.types"
import { studentAssignmentRepository } from "../student/student_assignment.services"

const assignmentRepository: Repository<Assignment> = postgresDataSource.getRepository(Assignment)

export const isAssignment = async (aId: string) => {
    const assignment = await assignmentRepository.findOne({ where: { aId } })
    if (!assignment) {
        throw new Error("Assignment not found")
    }
}

export const isAssignmentTakenByStudent = async (assignmentId: string) => {
    const isStudentTakeAssignment = await studentAssignmentRepository.findOne({
        where: {
            assignmentId
        }
    })
    if (isStudentTakeAssignment) {
        throw new Error("Student already taken this assignment.Cannot able to delete")
    }
}

export const getAssignment = async (courseId: string) => {
    try {
        await isCourse(courseId)
        const assignments = await assignmentRepository.find({
            where: {
                courseId
            }
        })
        return assignments
    } catch (err: any) {
        throw new Error(err.message)
    }
}

export const createAssignment = async (assignmentArgs: assignmentArgsType) => {
    try {
        await isCourse(assignmentArgs.cId)
        const aQn = assignmentArgs.aQn.toLowerCase()
        const assignmentQn = await assignmentRepository.findOne({
            where: {
                aQn
            }
        })
        if (assignmentQn) {
            throw new Error("Assignment already exists")
        }
        const assignment = assignmentRepository.create({
            ...assignmentArgs,
            aQn
        })
        await assignmentRepository.save(assignment)
        return "Assignment created successfully"
    } catch (err: any) {
        throw new Error(err.message)
    }
}

export const updateAssignment = async (updateAssignmentArgs: updateAssignmentArgsType) => {
    try {
        await isCourse(updateAssignmentArgs.courseId)
        await isAssignment(updateAssignmentArgs.aId)
        console.log(updateAssignmentArgs)
        await assignmentRepository.update(
            {
                aId:updateAssignmentArgs.aId,
                courseId:updateAssignmentArgs.courseId
            },
            {
                aQn:updateAssignmentArgs.aQn
            }
        )
        return "Assignment updated successfully"
    } catch (err: any) {
        throw new Error(err.message)
    }
}


export const deleteAssignment = async (assignmentArgs: assignmentArgsType) => {
    try {
        await isCourse(assignmentArgs.cId)
        await isAssignment(assignmentArgs.aId)
        await isAssignmentTakenByStudent(assignmentArgs.aId)
        await assignmentRepository.softDelete(assignmentArgs)
        return "Assignment deleted successfully"
    } catch (err: any) {
        throw new Error(err.message)
    }
}