import { gql } from "apollo-server";

export const studScoreTypedefs=gql`
    type StudentScore{
        u_id:String
        qb_id:String
        score:String
    }
    type Query{
        getStudentScore(u_id:String!):[StudentScore]
    }
`;
