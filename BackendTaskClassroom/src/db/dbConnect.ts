import { DataSource } from "typeorm";
import { config } from "dotenv";
import { User }  from "../module/user/entity/user.entity.ts"
import { Courses } from "../module/courses/entity/courses.entity.ts";
import { CourseMaterial } from "../module/courses/entity/course_material.entity.ts";
import { StudentAssignment } from "../module/student/entity/student_assignment.entity.ts";
import { Assignment } from "../module/course_assignment/entity/assignment.entity.ts";
import { QnBank } from "../module/course_qnbank/entity/qn_bank.entity.ts";
import { Questions } from "../module/course_qnbank/entity/questions.entity.ts";
import { Options } from "../module/course_qnbank/entity/options.entity.ts";
import { StudentScore } from "../module/student/entity/student_score.entity.ts";
config()

export const postgresDataSource= new DataSource({
    type:"postgres",
    host:process.env.DB_HOST,
    port:Number(process.env.DB_PORT),
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    entities:[User,Courses,CourseMaterial,StudentAssignment,Assignment,QnBank,Questions,Options,StudentScore],
    synchronize:false,
    migrations:["src/db/migration/*.ts"]
})

postgresDataSource.initialize()
.then(()=>{
    console.log("Database connected successfully")
})
.catch((err)=>{
    console.log("Error during dataSource initialization",err)
})