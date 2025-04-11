import { Entity,Column,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Courses } from "../../courses/entity/courses.entity";
import { Questions } from "./questions.entity";
import { StudentScore } from "../../student/entity/student_score.entity";
import { dateType } from "../../entityDateType";

@Entity({name:"qn_bank"})
export class QnBank{
    @PrimaryGeneratedColumn("uuid",{name:"qb_id"})
    qbId!:string;

    @Column({type:"varchar",length:30,name:"qb_name"})
    qbName!:string;

    @ManyToOne(()=>Courses,(course)=>course.qnBank)
    @JoinColumn({name:"c_id"})
    course!:Courses;

    @Column({name:"c_id"})
    courseId!:string;

    @OneToMany(()=>Questions,(question)=>question.qnBank,{cascade:true})
    question!:Questions[];

    @OneToMany(() => StudentScore, (score) => score.qnBank)
    score!: StudentScore;

    @CreateDateColumn({type:dateType,name:"qb_created_at"})
    qbCreatedAt!:Date;

    @UpdateDateColumn({type:dateType,name:"qb_updated_at"})
    qbUpdatedAt!:Date;

    @DeleteDateColumn({type:dateType,name:"qb_deleted_at", nullable: true })
    qbDeletedAt?:Date;
}
