import { ApolloServer } from 'apollo-server';
import './src/db/dbConnect'
import { userTypeDefs } from './src/module/user/user.typedefs';
import { userResolvers } from './src/module/user/user.resolvers';
import dotenv from 'dotenv';
import { verifyJWT } from './src/utils/verifyJWT';
dotenv.config();
console.log("Inside index.js file");

const server=new ApolloServer({
    typeDefs:[userTypeDefs],
    resolvers:[userResolvers],
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