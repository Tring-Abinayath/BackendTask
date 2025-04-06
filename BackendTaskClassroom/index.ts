import { ApolloServer } from 'apollo-server';
import './src/db/dbConnect'
import { userTypeDefs } from './src/module/user/user.typedefs';
import { userResolvers } from './src/module/user/user.resolvers';
import { verifyJWT } from './src/utils/verifyJWT';
import { courseTypeDefs } from './src/module/courses/courses.typedefs';
import { courseResolvers } from './src/module/courses/courses.resolvers';
import dotenv from 'dotenv';
import { courseMaterialsTypedefs } from './src/module/courses/course_material.typedefs';
import { courseMaterialResolvers } from './src/module/courses/course_material.resolvers';
import { s3TypeDefs } from './src/s3/s3.typedefs';
import { s3Resolvers } from './src/s3/s3.resolvers';
dotenv.config();
console.log("Inside index.js file");

const server=new ApolloServer({
    typeDefs:[userTypeDefs,courseTypeDefs,courseMaterialsTypedefs,s3TypeDefs],
    resolvers:[userResolvers,courseResolvers,courseMaterialResolvers,s3Resolvers],
    context:({req})=>{
        if(!req.headers.authorization){
            return null;
        }
        try{
            return verifyJWT(req.headers.authorization)
        }catch(err){
            throw err
        }
    }
})

server.listen().then(({url})=>{
    console.log(`Server listening at ${url}`)
})