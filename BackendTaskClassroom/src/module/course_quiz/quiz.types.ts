type CreateQuestionInput = {
    qn_name: string,
    options: CreateOptionsInput[]
}
type CreateOptionsInput = {
    option: string,
    is_answer: boolean
}

export type quizArgsTypes = {
    c_id: string,
    qb_name: string,
    questions: CreateQuestionInput[]
}

export type quizUpdateArgsTypes = {
    qb_id:string,
    c_id: string,
    qb_name: string,
    questions: CreateQuestionInput[]
}
type QnAnsType = {
    qnId: string,
    answerId: string
}
export type submitQuizArgsType = {
    qb_id: string,
    question_answer: QnAnsType[]
}

export type getQuizArgsInput={
    c_id:string,
    pageSize:number,
    page:number,
    searchQb:string
}
