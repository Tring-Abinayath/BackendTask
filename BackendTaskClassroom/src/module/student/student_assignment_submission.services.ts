import { userRepository } from "../user/user.service"

export const getStudAssignmentSubmit=async()=>{
    try{
        const result = await userRepository.createQueryBuilder('user')
        .leftJoinAndSelect('user.assignment', 'studentAssignment')  
        .leftJoinAndSelect('studentAssignment.assignment', 'assignment') 
        .select([
            'user.uId as u_id',  
            'studentAssignment.assignmentId as a_id',  
            'studentAssignment.saUpload AS sa_upload'
        ])
        .where('user.uRole = :role', { role: 'student' })  
        .getRawMany(); 

        return result.map((row: any) => ({
            u_id: row.u_id,
            a_id: row.a_id,
            submitted: row.sa_upload ? true : false 
          }));
          
    }catch(err:any){
        throw new Error(err.message)
    }
}
