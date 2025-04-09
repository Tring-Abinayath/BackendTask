import { Repository } from "typeorm"
import { Assignment } from "./entity/assignment.entity"
import { postgresDataSource } from "../../db/dbConnect"
import { isCourse } from "../courses/courses.services"
import { assignmentArgsType, updateAssignmentArgsType } from "./assignment.types"
import { studentAssignmentRepository } from "../student/student_assignment.services"

const assignmentRepository: Repository<Assignment> = postgresDataSource.getRepository(Assignment)

export const isAssignment = async (a_id: string) => {
    const assignment=await assignmentRepository.findOne({where:{aId:a_id}})
    if(!assignment){
        throw new Error("Assignment not found")
    }
}

export const isAssignmentTakenByStudent=async(a_id:string)=>{
    const isStudentTakeAssignment=await studentAssignmentRepository.findOne({
        where:{
            assignmentId:a_id
        }   
    })
    if(isStudentTakeAssignment){
        throw new Error("Student already taken this assignment.Cannot able to delete")
    }
}

export const getAssignment = async (c_id: string) => {
    try {
        await isCourse(c_id)
        const assignments = await assignmentRepository.find({
            where: {
                courseId: c_id
            }
        })
        return assignments.map(assignment => ({
            a_id: assignment.aId,
            a_qn: assignment.aQn,
            c_id: assignment.courseId
        }))
    } catch (err: any) {
        throw new Error(err.message)
    }
}

export const createAssignment = async (assignmentArgs: assignmentArgsType) => {
    try {
        await isCourse(assignmentArgs.c_id)
        const assignmentQn=await assignmentRepository.findOne({where:{aQn:assignmentArgs.a_qn.toLowerCase()}})
        if(assignmentQn){
            throw new Error("Assignment already exists")
        }
        const assignment = assignmentRepository.create({
            aId: assignmentArgs.a_id,
            aQn: assignmentArgs.a_qn.toLowerCase(),
            courseId: assignmentArgs.c_id,
        })
        await assignmentRepository.save(assignment)
        return "Assginment created successfully"
    } catch (err: any) {
        throw new Error(err.message)
    }
}

export const updateAssignment = async (updateAssignmentArgs: updateAssignmentArgsType) => {
    try {
        await isCourse(updateAssignmentArgs.c_id)
        await isAssignment(updateAssignmentArgs.a_id)
        await assignmentRepository.update({
            aId: updateAssignmentArgs.a_id,
            courseId: updateAssignmentArgs.c_id
        },
            {
                aQn: updateAssignmentArgs.a_qnNew
            }
        )
        return "Assignment updated successfully"
    } catch (err: any) {
        throw new Error(err.message)
    }
}


export const deleteAssignment = async (assignmentArgs: assignmentArgsType) => {
    try {
        await isCourse(assignmentArgs.c_id)
        await isAssignment(assignmentArgs.a_id)
        await isAssignmentTakenByStudent(assignmentArgs.a_id)
        // await assignmentRepository.softDelete({ aId: assignmentArgs.a_id, courseId: assignmentArgs.c_id })
        return "Assignment deleted successfully"
    } catch (err: any) {
        throw new Error(err.message)
    }
}