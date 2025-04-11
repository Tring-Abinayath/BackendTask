import { Context } from "../courses/courses.resolvers";
import { isAuthorized } from "../courses/courses.services";
import { userRole } from "../user/entity/user.entity";
import { getStudAssignmentSubmit } from "./student_assignment_submission.services";

export const studAssignmentSubmitResolvers = {
    Query: {
        getStudAssignmentSubmit: async (_: any,_args:any, context: Context) => {
            try {
                await isAuthorized(context, [userRole.Admin])
                return getStudAssignmentSubmit()
            } catch (err: any) {
                throw new Error(err.message)
            }
        }
    }
}
