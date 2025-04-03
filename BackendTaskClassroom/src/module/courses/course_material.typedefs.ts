import { gql } from "apollo-server";

export const courseMaterialsTypedefs=gql`
    type CourseMaterial{
        cMatId:String
        cMatUpload:String
        cId:String
    }
    type Query{
        getCourseMaterial(c_id:String!):CourseMaterial
    }
    type Mutation{
        addCourseMaterial(c_mat_upload:String!,c_id:String!):String
    }
`