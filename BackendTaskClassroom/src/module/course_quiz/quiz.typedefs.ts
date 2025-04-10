import { gql } from "apollo-server";

export const quizTypedefs = gql`
    input CreateQuestionInput{
        qn_name:String!
        options:[CreateOptionsInput!]!
    }
    input CreateOptionsInput{
        option:String!
        is_answer:Boolean!
    }
    type Score {
        qb_id:String
        score: Int
    }
    input SubmitAnswer{
        qnId:String!
        answerId:String!
    }
    type Mutation{
        addQuiz(
            c_id:String!,
            qb_name:String!,
            questions:[CreateQuestionInput!]!,
        ):String
        submitQuiz(
            qb_id:String!,
            question_answer:[SubmitAnswer!]!
        ):Score
        deleteQuiz(qb_id:String!):String
    }
`;