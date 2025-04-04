import { addCourseMaterial, deleteCourseMaterial, getCourseMaterial, updateCourseMaterial } from "./course_material.services";
import { Context } from "./courses.resolvers";

export const courseMaterialResolvers={
    Query:{
        getCourseMaterial:(_:any,{c_id,bucket}:{c_id:string,bucket:string})=>{
            return getCourseMaterial({c_id,bucket})
        }
    },
    Mutation:{
        addCourseMaterial:(_:any,{c_id,c_mat_upload}:{c_id:string,c_mat_upload:string},context:Context)=>{
            return addCourseMaterial({c_id,c_mat_upload},context)
        },
        updateCourseMaterial:(_:any,{c_mat_id,c_id,c_mat_newUpload}:{c_mat_id:string,c_id:string,c_mat_newUpload:string},context:Context)=>{
            return updateCourseMaterial({c_mat_id,c_id,c_mat_newUpload},context)
        },
        deleteCourseMaterial:(_:any,{c_mat_id,c_id}:{c_mat_id:string,c_id:string},context:Context)=>{
            return deleteCourseMaterial({c_mat_id,c_id},context)
        }
    }
}