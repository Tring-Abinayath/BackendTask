import { userRole } from "../module/user/entity/user.entity";
import { userRepository } from "../module/user/user.service";
import bcrypt from 'bcryptjs'

export const createAdmin = async () => {
    try {
        const isAdminUser = await userRepository.findOne({ where: { uEmail: process.env.ADMIN_EMAIL } })

        if (!isAdminUser) {
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD as string, process.env.SALT_ROUNDS as string);
            const adminUser = userRepository.create({ uEmail: process.env.ADMIN_EMAIL, uPassword: hashedPassword, uRole: process.env.ADMIN_ROLE as userRole });
            await userRepository.save(adminUser)
        }
        return 'Admin Created Successfully'
    } catch (err: any) {
        throw new Error(err.message)
    }
}
