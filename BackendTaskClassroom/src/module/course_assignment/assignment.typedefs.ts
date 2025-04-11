import { gql } from "apollo-server";

export const assignmentTypedefs = gql`
    type Assignment{
        a_id:String
        a_qn:String
        c_id:String
    }
    type Query{
        getAssignment(c_id:String!):[Assignment]
    }
    type Mutation{
        createAssignment(a_qn:String!,c_id:String!):String
        updateAssignment(a_id:String!,c_id:String!,a_qnNew:String!):String
        deleteAssignment(a_id:String!,c_id:String!):String

    }
`;
