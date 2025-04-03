import { uploadToS3 } from "./s3.js";
import { Context } from "../module/courses/courses.resolvers.js";
import { isAuthorized } from "../module/courses/courses.services.js";

export const s3Resolvers = {
    Query: {
        getUploadPreSignedUrl: async (_:any,{bucket,key}:{bucket:string,key:string},context:Context) => {
            try {
                isAuthorized(context)
                const url = await uploadToS3(bucket,key)
                return {url};
            } catch (err:any) {
                throw new Error(err.message)
            }
        }
    }
}