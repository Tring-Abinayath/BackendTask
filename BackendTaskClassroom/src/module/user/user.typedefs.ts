import { gql } from "apollo-server";

export const userTypeDefs = gql`

    enum UserRole {
    admin
    student
  }

    type User {
        u_id: String
        u_email: String
        u_password:String
        u_role: UserRole
        u_created_at:String
    }
    type Query {
        getUsers: [User]
        getUserById(u_id:String!):User
    }

    input CreateUser{
        u_email:String!
        u_password:String!
        u_role:UserRole
    }

    type Token{
        token:String!
    }
    type Mutation{
        signup(createUser:CreateUser!):String
        signin(u_email:String!,u_password:String!):Token
    }

`