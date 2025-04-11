import { Entity,Column,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Courses } from "./courses.entity";
import { dateType } from "../../entityDateType";

@Entity({name:"course_material"})
export class CourseMaterial{
    @PrimaryGeneratedColumn("uuid",{name:"c_mat_id"})
    cMatId!:string;

    @Column({name:"c_mat_upload"})
    cMatUpload!:string;

    @ManyToOne(()=>Courses,(course)=>course.courseMaterials)
    @JoinColumn({name:"c_id"})
    course!: Courses

    @Column({name:"c_id"})
    courseId!:string;


    @CreateDateColumn({type:dateType,name:"c_mat_created_at"})
    cMatCreatedAt!:Date;

    @UpdateDateColumn({type:dateType,name:"c_mat_updated_at"})
    cMatUpdatedAt!:Date;

    @DeleteDateColumn({type:dateType,name:"c_mat_deleted_at", nullable: true })
    cMatDeletedAt?:Date;
}
