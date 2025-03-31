import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { postgresDataSource } from "../../db/dbConnect";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userRepository: Repository<User> = postgresDataSource.getRepository(User);

export const existingUser = async (u_email: string) => {
    const existUser = await userRepository.findOne({ where: { u_email } })
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

export const signup = async ({ createUser }: { createUser: { u_email: string, u_password: string } }) => {
    const { u_email, u_password } = createUser
    try {
        await existingUser(u_email)
        await validEmailAndPassword(u_email, u_password)
        const hashedPassword = await bcrypt.hash(u_password, 10);
        const newUser = userRepository.create({ u_email, u_password: hashedPassword });
        await userRepository.save(newUser)
        return "User created successfully"
    } catch (err) {
        throw err
    }
}

export const isEmail=async({u_email,u_password}:{u_email:string,u_password:string})=>{
    const getUser = await userRepository.findOne({ where: { u_email } })
    if (!getUser) {
        throw new Error("Incorrect email or password")
    }
    const isPassword = await bcrypt.compare(u_password, getUser.u_password)
    if (!isPassword) {
        throw new Error("Incorrect email or password")
    }
    return getUser
}

export const signin = async ({ u_email, u_password }: { u_email: string, u_password: string })=>{
    const jwt_key = process.env.JWT_KEY as string;
    try{
        const getUser=await isEmail({u_email,u_password})
        const token = jwt.sign({
            u_id:getUser.u_id,
            u_email: getUser.u_email,
            u_role:getUser.u_role
        }, jwt_key, { expiresIn: '1h' })
        return { token }
    }
    catch(err){
        throw err
    }
}