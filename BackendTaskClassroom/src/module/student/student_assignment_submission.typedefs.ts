import { gql } from "apollo-server";

export const studAssignmentSubmitTypedefs=gql`
    type AssignmentSubmit{
        u_id:String
        a_id:String
        submitted:Boolean
    }
    type Query{
        getStudAssignmentSubmit:[AssignmentSubmit]
    }
`