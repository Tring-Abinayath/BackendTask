import { Entity,Column,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm";
import { CourseMaterial } from "./course_material.entity.ts";
import { Assignment } from "../../course_assignment/entity/assignment.entity.ts";
import { QnBank } from "../../course_qnbank/entity/qn_bank.entity.ts";

@Entity({name:"courses"})
export class Courses{
    @PrimaryGeneratedColumn("uuid")
    c_id!:string;

    @Column({type:"varchar",length:30})
    c_name!:string;

    @OneToMany(()=>CourseMaterial,(courseMaterial)=>courseMaterial.course)
    courseMaterials!:CourseMaterial[];

    @OneToMany(()=>Assignment,(assignment)=>assignment.course)
    assignment!:Assignment[]

    @OneToMany(()=>QnBank,(qnBank)=>qnBank.course)
    qnBank!:QnBank[]

    @CreateDateColumn({type:"time with time zone",default:'NOW()'})
    c_created_at!:Date;

    @UpdateDateColumn({type:"time with time zone",default:'NOW()'})
    c_updated_at!:Date;

    @DeleteDateColumn({type:"time with time zone", nullable: true })
    c_deleted_at?:Date;
}
