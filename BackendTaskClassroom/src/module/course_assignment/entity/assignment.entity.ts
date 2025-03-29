import { Entity,Column,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Courses } from "../../courses/entity/courses.entity";
import { StudentAssignment } from "../../student/entity/student_assignment.entity";

@Entity({name:"assignments"})
export class Assignment{
    @PrimaryGeneratedColumn("uuid")
    a_id!:string;

    @Column()
    a_qn!:string;

    @Column()
    a_upload!:string;

    @ManyToOne(()=>Courses,(course)=>course.assignment)
    @JoinColumn({name:"c_id"})
    course!:Courses

    @OneToMany(()=>StudentAssignment,(studAssignment)=>studAssignment.assignment)
    studentAssignment!:StudentAssignment[]

    @CreateDateColumn({type:"time with time zone",default:"NOW()"})
    a_created_at!:Date;

    @UpdateDateColumn({type:"time with time zone",default:"NOW()"})
    a_updated_at!:Date;

    @DeleteDateColumn({type:"time with time zone", nullable: true })
    a_deleted_at?:Date;
}