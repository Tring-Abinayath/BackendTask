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
    type Options{
        op_id:String
        option:String
    }
    type Questions{
        qn_id:String
        qn:String
        options:[Options!]
    }
    type QnBank{
        qb_id:String
        qb_name:String
        questions:[Questions!]!
    }
    type Query{
        getQuiz(c_id:String!,pageSize:Int,page:Int,searchQb:String):[QnBank!]
    }

    type Mutation{
        addQuiz(
            c_id:String!,
            qb_name:String!,
            questions:[CreateQuestionInput!]!,
        ):String
        updateQuiz(
            qb_id:String!,
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