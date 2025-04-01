import { gql } from "apollo-server";

export const courseTypeDefs=gql`
    type Course{
        c_id:String
        c_name:String
        c_created_at:String
        c_updated_at:String
        c_deleted_at:String
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