import { gql } from "apollo-server";

export const userTypeDefs=gql `
    type User {
        u_id: String
        u_email: String
        u_password:String
        u_role: String
        u_created_at:String
    }
    type Query {
        getUsers: [User]
        getUserById(u_id:String!):User
    }

    input CreateUser{
        u_email:String!
        u_password:String!
    }

    type Token{
        token:String!
    }
    type Mutation{
        signup(createUser:CreateUser!):String
        signin(u_email:String!,u_password:String!):Token
    }

`