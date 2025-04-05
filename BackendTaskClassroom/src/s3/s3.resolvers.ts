import { uploadToS3 } from "./s3.ts";
import { getPreSignedUrlArgsType } from "./s3.types.ts";

export const s3Resolvers = {
    Query: {
        getUploadPreSignedUrl: async (_: any, {getPreSignedUrl}: { getPreSignedUrl:getPreSignedUrlArgsType}) => {
            const {bucket,key}=getPreSignedUrl
            try {
                const url = await uploadToS3(bucket, key)
                return { url };
            } catch (err: any) {
                throw new Error(err.message)
            }
        }
    }
}