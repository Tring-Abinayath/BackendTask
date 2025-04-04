import { uploadToS3 } from "./s3.ts";
import { Context } from "../module/courses/courses.resolvers.ts";
import { isAuthorized } from "../module/courses/courses.services.ts";

export const s3Resolvers = {
    Query: {
        // getUploadPreSignedUrl: async (_:any,{bucket,key}:{bucket:string,key:string},context:Context) => {
        getUploadPreSignedUrl: async (_: any, {getPreSignedUrl}: { getPreSignedUrl:{bucket: string, key: string }}, context: Context) => {
            const {bucket,key}=getPreSignedUrl
            try {
                isAuthorized(context)
                const url = await uploadToS3(bucket, key)
                return { url };
            } catch (err: any) {
                throw new Error(err.message)
            }
        }
    }
}