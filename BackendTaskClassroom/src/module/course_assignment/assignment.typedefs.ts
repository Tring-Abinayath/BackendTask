import { gql } from "apollo-server";

export const assignmentTypedefs = gql`
    type Assignment{
        aId:String
        aQn:String
        courseId:String
    }
    type Query{
        getAssignment(cId:String!):[Assignment]
    }
    type Mutation{
        createAssignment(aQn:String!,courseId:String!):String
        updateAssignment(aId:String!,courseId:String!,aQn:String!):String
        deleteAssignment(aId:String!,courseId:String!):String

    }
`;