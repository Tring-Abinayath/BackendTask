import jwt from 'jsonwebtoken';

type Token={
    u_id:string;
    u_role:string;
}

export const verifyJWT= (token:string)=>{
    const jwt_key=process.env.JWT_KEY as string;
    try{
        if(!token){
            throw new Error("Unauthorized")
        }
        const verification= jwt.verify(token,jwt_key) as Token
        return {
            u_id:verification.u_id,
            u_role:verification.u_role
        }
    }catch(err:any){
        throw new Error(err.message)
    }
}