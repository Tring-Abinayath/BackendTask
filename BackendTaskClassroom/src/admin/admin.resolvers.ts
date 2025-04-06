import { createAdmin } from './admin.service';

export const adminResolvers = {
    Mutation: {
        createAdmin: () => {
            return createAdmin();   
        }
    }
};
