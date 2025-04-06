import { Entity,Column,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Courses } from "../../courses/entity/courses.entity";
import { StudentAssignment } from "../../student/entity/student_assignment.entity";

@Entity({name:"assignments"})
export class Assignment{
    @PrimaryGeneratedColumn("uuid",{name:"a_id"})
    aId!:string;

    @Column({name:"a_qn"})
    aQn!:string;

    @Column({name:"a_upload"})
    aUpload!:string;

    @ManyToOne(()=>Courses,(course)=>course.assignment)
    @JoinColumn({name:"c_id"})
    course!:Courses

    @OneToMany(()=>StudentAssignment,(studAssignment)=>studAssignment.assignment)
    studentAssignment!:StudentAssignment[]

    @CreateDateColumn({type:"timestamp with time zone",name:"a_created_at"})
    aCreatedAt!:Date;

    @UpdateDateColumn({type:"timestamp with time zone",name:"a_updated_at"})
    aUpdatedAt!:Date;

    @DeleteDateColumn({type:"timestamp with time zone",name:"a_deleted_at",nullable: true })
    aDeletedAt?:Date;
}