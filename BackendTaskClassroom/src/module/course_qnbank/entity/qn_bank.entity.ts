import { Entity,Column,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Courses } from "../../courses/entity/courses.entity";
import { Questions } from "./questions.entity";
import { StudentScore } from "../../student/entity/student_score.entity";

@Entity({name:"qn_bank"})
export class QnBank{
    @PrimaryGeneratedColumn("uuid")
    qb_id!:string;

    @Column({type:"varchar",length:30})
    qb_name!:string;

    @ManyToOne(()=>Courses,(course)=>course.qnBank)
    @JoinColumn({name:"c_id"})
    course!:Courses;

    @OneToMany(()=>Questions,(question)=>question.qnBank)
    question!:Questions[];

    @OneToOne(() => StudentScore, (score) => score.qnBank)
    score!: StudentScore;

    @CreateDateColumn({type:"time with time zone",default:"NOW()"})
    qb_created_at!:Date;

    @UpdateDateColumn({type:"time with time zone",default:"NOW()"})
    qb_updated_at!:Date;

    @DeleteDateColumn({type:"time with time zone", nullable: true })
    qb_deleted_at?:Date;
}