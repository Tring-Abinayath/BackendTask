import { getCourses } from "../courses/courses.services";
import { getUserById, getUsers, signin, signup } from "./user.service";

export const userResolvers = {
    Query: {
        getUsers: async() => {
            return getUsers();
        },
        getUserById:async(_:any,{u_id}:{u_id:string})=>{
            return getUserById({u_id})
        }
    },
    Mutation:{
        signup:async(_:any,{createUser}:{createUser:{u_email:string,u_password:string,u_role:string}})=>{
            return signup({createUser});
        },
        signin:async(_:any,{u_email,u_password}:{u_email:string,u_password:string})=>{
            return signin({u_email,u_password})
        }
    }
}
