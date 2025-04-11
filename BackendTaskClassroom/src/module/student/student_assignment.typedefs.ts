import { gql } from "apollo-server";

export const studAssignmentTypedefs = gql`
    type StudentAssignment{
        sa_id:String
        a_id:String
        u_id:String
        sa_upload:String
    }
    type Query{
        getStudentAssignment(
            u_id:String!,
            sa_upload:String,
            pageSize:Int,
            page:Int
        ):[StudentAssignment]
    }
    type Mutation{
        uploadAssignment(
            a_id:String!,
            u_id:String!,
            sa_upload:String!
        ):String
        updateStudentAssignment(
            sa_id:String!,
            a_id:String!,
            u_id:String!,
            sa_uploadNew:String!
        ):String
        deleteStudentAssignment(
            sa_id:String!,
            a_id:String!,
            u_id:String!        
        ):String
    }
`;
