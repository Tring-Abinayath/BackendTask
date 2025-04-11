import { Context } from "../courses/courses.resolvers";
import { studAssignmentArgsInput } from "./student_assignment.types";
import { isAuthorized } from "../courses/courses.services";
import { userRole } from "../user/entity/user.entity";
import { deleteStudentAssignment, getStudentAssignment, updateStudentAssignment, uploadAssignment } from "./student_assignment.services";


export const studAssignmentResolvers={
    Query:{
        getStudentAssignment:async(_:any,studAssignmentArgs:studAssignmentArgsInput,context:Context)=>{
            try{
                await isAuthorized(context,[userRole.Student,userRole.Admin])
                return getStudentAssignment(studAssignmentArgs)
            }catch(err:any){
                throw new Error(err.message)
            }
        }  
    },
    Mutation:{
        uploadAssignment:async(_:any,studAssignmentArgs:studAssignmentArgsInput,context:Context)=>{
            try{
                await isAuthorized(context,[userRole.Student])
                return uploadAssignment(studAssignmentArgs)
            }catch(err:any){
                throw new Error(err.message)
            }
        },
        updateStudentAssignment:async(_:any,studAssignmentArgs:studAssignmentArgsInput,context:Context)=>{
            try{
                await isAuthorized(context,[userRole.Student])
                return updateStudentAssignment(studAssignmentArgs)
            }catch(err:any){
                throw new Error(err.message)
            }
        },
        deleteStudentAssignment:async(_:any,studAssignmentArgs:studAssignmentArgsInput,context:Context)=>{
            try{
                await isAuthorized(context,[userRole.Student])
                return deleteStudentAssignment(studAssignmentArgs)
            }catch(err:any){
                throw new Error(err.message)
            }
        }
    }
}
