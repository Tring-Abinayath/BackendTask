import { gql } from "apollo-server";

export const studAssignmentTypedefs = gql`
    type StudentAssignment{
        saId:String
        assignmentId:String
        userId:String
        saUpload:String
    }
    type Query{
        getStudentAssignment(
            uId:String!,
            saUpload:String,
            pageSize:Int=10,
            page:Int=1
        ):[StudentAssignment]
    }
    type Mutation{
        uploadAssignment(
            assignmentId:String!,
            userId:String!,
            saUpload:String!
        ):String
        updateStudentAssignment(
            saId:String!,
            assignmentId:String!,
            userId:String!,
            saUploadNew:String!
        ):String
        deleteStudentAssignment(
            saId:String!,
            assignmentId:String!,
            userId:String!        
        ):String
    }
`;