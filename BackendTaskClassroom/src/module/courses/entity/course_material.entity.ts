import { Entity,Column,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, ManyToMany, ManyToOne, JoinTable, JoinColumn } from "typeorm";
import { Courses } from "./courses.entity";

@Entity({name:"course_material"})
export class CourseMaterial{
    @PrimaryGeneratedColumn("uuid",{name:"c_mat_id"})
    cMatId!:string;

    @Column({name:"c_mat_upload"})
    cMatUpload!:string;

    @ManyToOne(()=>Courses,(course)=>course.courseMaterials)
    @JoinColumn({name:"c_id"})
    course!: Courses

    @CreateDateColumn({type:"timestamp with time zone",name:"c_mat_created_at"})
    cMatCreatedAt!:Date;

    @UpdateDateColumn({type:"timestamp with time zone",name:"c_mat_updated_at"})
    cMatUpdatedAt!:Date;

    @DeleteDateColumn({type:"timestamp with time zone",name:"c_mat_deleted_at", nullable: true })
    cMatDeletedAt?:Date;
}