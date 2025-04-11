import { Context } from "../courses/courses.resolvers";
import { isAuthorized } from "../courses/courses.services";
import { userRole } from "../user/entity/user.entity";
import { getStudentScore } from "./student_score.services";

export const studScoreResolvers = {
    Query: {
        getStudentScore: async (_: any, {u_id}:{u_id: string}, context: Context) => {
            try {
                await isAuthorized(context, [userRole.Student])
                return getStudentScore(u_id)
            } catch (err: any) {
                throw new Error(err.message)
            }
        }
    }
}
