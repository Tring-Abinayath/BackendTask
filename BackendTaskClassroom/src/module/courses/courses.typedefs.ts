import { gql } from "apollo-server";

export const courseTypeDefs=gql`
    type Course{
        cId:String
        cName:String
    }
    type Query{
        getCourses:[Course]
        searchCourse(c_name:String!):[Course]
    }
    type Mutation{
        addCourse(c_name:String!):String
        updateCourse(c_id:String!,c_newName:String!):String
        deleteCourse(c_id:String!):String
    }
`