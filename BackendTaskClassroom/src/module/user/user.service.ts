import { Repository } from "typeorm";
import { User, userRole } from "./entity/user.entity";
import { postgresDataSource } from "../../db/dbConnect";
import bcrypt from 'bcryptjs'
import jwt  from 'jsonwebtoken'
import { userArgsType } from "./user.types";
import { getPaginationArgsInput } from "./user.resolvers";

export const userRepository: Repository<User> = postgresDataSource.getRepository(User);
export const getUsers = async (getUserArgs:getPaginationArgsInput) => {
    const page=getUserArgs.page?getUserArgs.page:1
    const pageSize=getUserArgs.pageSize?getUserArgs.pageSize:10
    const skip=(page-1)*pageSize
    try {
       return await userRepository.find({
        where:{
            uRole:"student" as userRole
        },
        take:getUserArgs.pageSize,
        skip  
    })
    } catch (err: any) {
        throw new Error(err.message)
    }
}

export const getUserById = async ({ u_id }: { u_id: string }) => {
    try {
        return await userRepository.findOne({ where: { uId: u_id } })
    } catch (err: any) {
        throw new Error(err.message)
    }
}

export const existingUser = async (uEmail: string) => {
    const existUser = await userRepository.findOne({ where: { uEmail } })
    if (existUser) {
        throw new Error("User already exist")
    }
}

export const validEmailAndPassword = async (uEmail: string, uPassword: string) => {
    const emailFormat = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (!emailFormat.test(uEmail)) {
        throw new Error("Invalid Email")
    }
    const passwordFormat = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*?]).{8,}$/;
    if (!passwordFormat.test(uPassword)) {
        throw new Error("Required strong password")
    }
}

export const signup = async ({ createUser }: { createUser:userArgsType }) => {
    const { u_email, u_password } = createUser
    const saltRounds=parseInt(process.env.SALT_ROUNDS || '10');
    try {
        await existingUser(u_email)
        await validEmailAndPassword(u_email, u_password)
        const hashedPassword = await bcrypt.hash(u_password, saltRounds);
        const newUser = userRepository.create({ uEmail: u_email, uPassword: hashedPassword});
        await userRepository.save(newUser)
        return "User created successfully"
    } catch (err:any) {
        console.log(err.message)
        throw err
    }
}

export const isEmail = async (userArgs: userArgsType) => {
    const { u_email, u_password }=userArgs
    const getUser = await userRepository.findOne({ where: { uEmail: u_email } })
    if (!getUser) {
        throw new Error("Incorrect email or password")
    }
    const isPassword = await bcrypt.compare(u_password, getUser.uPassword)
    if (!isPassword) {
        throw new Error("Incorrect email or password")
    }
    return getUser
}

export const signin = async (userArgs: userArgsType) => {
    const jwtKey = process.env.JWT_KEY as string;
    const jwtExpires=process.env.JWT_EXPIRES || '1h';
    try {
        const getUser = await isEmail(userArgs)
        const token = jwt.sign({
            u_id: getUser.uId,
            u_email: getUser.uEmail,
            u_role: getUser.uRole
        }, jwtKey, {expiresIn:parseInt(jwtExpires)})
        return { token }
    }
    catch (err:any) {
        throw err
    }
}
