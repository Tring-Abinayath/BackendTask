import { gql } from "apollo-server";

export const userTypeDefs = gql`

    enum UserRole {
    admin
    student
  }

    type User {
        uId: String
        uEmail: String
        uPassword:String
        uRole: UserRole
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