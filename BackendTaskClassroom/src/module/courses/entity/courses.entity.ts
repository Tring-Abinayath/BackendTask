import { Entity,Column,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm";
import { CourseMaterial } from "./course_material.entity.ts";
import { Assignment } from "../../course_assignment/entity/assignment.entity.ts";
import { QnBank } from "../../course_qnbank/entity/qn_bank.entity.ts";

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

    @CreateDateColumn({type:"timestamp with time zone",name:"c_created_at"})
    cCreatedAt!:Date;

    @UpdateDateColumn({type:"timestamp with time zone",name:"c_updated_at"})
    cUpdatedAt!:Date;

    @DeleteDateColumn({type:"timestamp with time zone",name:"c_deleted_at", nullable: true })
    cDeletedAt?:Date;
}
