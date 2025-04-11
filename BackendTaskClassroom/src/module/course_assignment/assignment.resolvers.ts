import { Context } from "../courses/courses.resolvers";
import { isAuthorized } from "../courses/courses.services";
import { userRole } from "../user/entity/user.entity";
import { assignmentArgsType, updateAssignmentArgsType } from "./assignment.types";
import { createAssignment, deleteAssignment, getAssignment, updateAssignment } from "./assignment.services";

export const assignmentResolvers={
    Query:{
        getAssignment:async(_:any,{c_id}:{c_id:string},context:Context)=>{
            try{
                await isAuthorized(context,[userRole.Admin,userRole.Student])
                return getAssignment(c_id)
            }catch(err:any){
                throw new Error(err.message)
            }
        }
    },
    Mutation:{
        createAssignment:async(_:any,assignmentArgs:assignmentArgsType,context:Context)=>{
            try{
                await isAuthorized(context,[userRole.Admin])
                return createAssignment(assignmentArgs)
            }catch(err:any){
                throw new Error(err.message)
            }
        },
        updateAssignment:async(_:any,updateAssignmentArgs:updateAssignmentArgsType,context:Context)=>{
            try{
                await isAuthorized(context,[userRole.Admin])
                return updateAssignment(updateAssignmentArgs)
            }catch(err:any){
                throw new Error(err.message)
            }
        },
        deleteAssignment:async(_:any,assignmentArgs:assignmentArgsType,context:Context)=>{
            try{
                await isAuthorized(context,[userRole.Admin])
                return deleteAssignment(assignmentArgs)
            }catch(err:any){
                throw new Error(err.message)
            }
        }
    }
}
