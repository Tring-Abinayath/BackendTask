import { addCourseMaterial, getCourseMaterial } from "./course_material.services";
import { Context } from "./courses.resolvers";

export const courseMaterialResolvers={
    Query:{
        getCourseMaterial:(_:any,{c_id}:{c_id:string})=>{
            return getCourseMaterial({c_id})
        }
    },
    Mutation:{
        addCourseMaterial:(_:any,{c_id,c_mat_upload}:{c_id:string,c_mat_upload:string},context:Context)=>{
            return addCourseMaterial({c_id,c_mat_upload},context)
        }
    }
}