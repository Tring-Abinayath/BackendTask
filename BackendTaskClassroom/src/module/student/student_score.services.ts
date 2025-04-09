import { studentScoreRepository } from "../course_quiz/quiz.services"
import { userRepository } from "../user/user.service"

export const getStudentScore=async(u_id:string)=>{
    try{
        const isUser=await userRepository.find({where:{uId:u_id}})
        if(!isUser){
            throw new Error("User not found")
        }
        const getScore=await studentScoreRepository.find({
            where:{
                userId:u_id,
            }
        })
        return getScore.map(score=>({
            u_id:score.userId,
            qb_id:score.qbId,
            score:score.score
        }))
    }catch(err:any){
        throw new Error(err.message)
    }
}