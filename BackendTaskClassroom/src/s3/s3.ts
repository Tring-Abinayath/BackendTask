import { GetObjectCommand,PutObjectCommand,S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3=new S3Client({
    region:process.env.REGION
})

export const uploadToS3=async(bucket:string,key:string)=>{
    const command=new PutObjectCommand({
        Bucket:bucket,
        Key:key
    })
    try{
        const url=await getSignedUrl(s3,command,{expiresIn:3600})
        return url
    }catch(err:any){
        throw new Error(err.message)
    }
}

export const downloadFromS3=async(bucket:string,key:string)=>{
    const command=new GetObjectCommand({
        Bucket:bucket,
        Key:key
    })
    try{
        const url=await getSignedUrl(s3,command,{expiresIn:3600})
        return url
    }catch(err:any){
        throw new Error(err.message)
    }
}