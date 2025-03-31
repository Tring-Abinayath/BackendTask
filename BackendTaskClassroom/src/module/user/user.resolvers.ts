import { Repository } from "typeorm";
import { postgresDataSource } from "../../db/dbConnect";
import { User } from "./entity/user.entity";
import { signin, signup } from "./user.service";

const userRepository: Repository<User> = postgresDataSource.getRepository(User);

export const userResolvers = {
    Query: {
        getUsers: async () => {
            return await userRepository.find();
        },
        getUserById:async(_:any,{u_id}:{u_id:string})=>{
            return await userRepository.findOne({where:{u_id}})
        }
    },
    Mutation:{
        signup:async(_:any,{createUser}:{createUser:{u_email:string,u_password:string}})=>{
            return await signup({createUser});
        },
        signin:async(_:any,{u_email,u_password}:{u_email:string,u_password:string})=>{
            return await signin({u_email,u_password})
        }
    }
}
