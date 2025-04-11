import { gql } from "apollo-server";

export const courseMaterialsTypedefs=gql`
    type CourseMaterial{
        cMatId:String
        cMatUpload:String
        cId:String
        url:String
    }
    type Query{
        getCourseMaterial(
            c_id:String!,
            bucket:String!,
            pageSize:Int,
            page:Int,
            courseMaterialName:String
        ):[CourseMaterial]
    }
    type Mutation{
        addCourseMaterial(c_mat_upload:String!,c_id:String!):String
        updateCourseMaterial(c_mat_id:String!,c_mat_newUpload:String!,c_id:String!):String
        deleteCourseMaterial(c_mat_id:String!,c_id:String!):String
    }
`;
