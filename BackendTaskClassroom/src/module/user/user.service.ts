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
       return userRepository.find({
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
        return userRepository.findOne({ where: { uId: u_id } })
    } catch (err: any) {
        throw new Error(err.message)
    }
}

export const existingUser = async (u_email: string) => {
    const existUser = await userRepository.findOne({ where: { uEmail: u_email } })
    if (existUser) {
        throw new Error("User already exist")
    }
    return;
}

export const validEmailAndPassword = async (u_email: string, u_password: string) => {
    const emailFormat = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (!emailFormat.test(u_email)) {
        throw new Error("Invalid Email")
    }
    const passwordFormat = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*?]).{8,}$/;
    if (!passwordFormat.test(u_password)) {
        throw new Error("Required strong password")
    }
}

export const signup = async ({ createUser }: { createUser:userArgsType }) => {
    const { u_email, u_password } = createUser
    const salt_rounds=parseInt(process.env.SALT_ROUNDS || '10');
    try {
        await existingUser(u_email)
        await validEmailAndPassword(u_email, u_password)
        const hashedPassword = await bcrypt.hash(u_password, salt_rounds);
        const newUser = userRepository.create({ uEmail: u_email, uPassword: hashedPassword});
        await userRepository.save(newUser)
        return "User created successfully"
    } catch (err) {
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
    const { u_email, u_password }=userArgs
    const jwt_key = process.env.JWT_KEY as string;
    const jwt_expires=process.env.JWT_EXPIRES || '1h';
    try {
        const getUser = await isEmail(userArgs)
        const token = jwt.sign({
            u_id: getUser.uId,
            u_email: getUser.uEmail,
            u_role: getUser.uRole
        }, jwt_key, {expiresIn:parseInt(jwt_expires)})
        return { token }
    }
    catch (err) {
        throw err
    }
}