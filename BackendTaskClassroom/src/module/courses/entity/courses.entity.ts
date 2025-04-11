import { Entity,Column,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm";
import { CourseMaterial } from "./course_material.entity";
import { Assignment } from "../../course_assignment/entity/assignment.entity";
import { QnBank } from "../../course_quiz/entity/qn_bank.entity";
import { dateType } from "../../entityDateType";

@Entity({name:"courses"})
export class Courses{
    @PrimaryGeneratedColumn("uuid",{name:"c_id"})
    cId!:string;

    @Column({type:"varchar",length:30,name:"c_name"})
    cName!:string;

    @OneToMany(()=>CourseMaterial,(courseMaterial)=>courseMaterial.course)
    courseMaterials!:CourseMaterial[];

    @OneToMany(()=>Assignment,(assignment)=>assignment.course)
    assignment!:Assignment[]

    @OneToMany(()=>QnBank,(qnBank)=>qnBank.course)
    qnBank!:QnBank[]

    @CreateDateColumn({type:dateType,name:"c_created_at"})
    cCreatedAt!:Date;

    @UpdateDateColumn({type:dateType,name:"c_updated_at"})
    cUpdatedAt!:Date;

    @DeleteDateColumn({type:dateType,name:"c_deleted_at", nullable: true })
    cDeletedAt?:Date;
}
