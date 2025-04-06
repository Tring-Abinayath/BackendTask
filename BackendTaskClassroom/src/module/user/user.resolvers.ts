import { Context } from "../courses/courses.resolvers";
import { isAuthorized } from "../courses/courses.services";
import { userRole } from "./entity/user.entity";
import { getUserById, getUsers, signin, signup } from "./user.service";
import { userArgsType } from "./user.types";

export const userResolvers = {
    Query: {
        getUsers: async (_: any,_args:any,context:Context) => {
            try {
                await isAuthorized(context, [userRole.Admin, userRole.Student])
                return getUsers();
            } catch (err: any) {
                throw new Error(err.message)
            }
        },
        getUserById: async (_: any, { u_id }: { u_id: string },context:Context) => {
            try {
                await isAuthorized(context, [userRole.Admin, userRole.Student])
                return getUserById({ u_id })
            } catch (err: any) {
                throw new Error(err.message)
            }
        }
    },
    Mutation: {
        signup: async (_: any, { createUser }: { createUser:userArgsType }) => {
            return signup({ createUser });
        },
        signin: async (_: any, signInArgs: userArgsType) => {
            return signin(signInArgs)
        }
    }
}
