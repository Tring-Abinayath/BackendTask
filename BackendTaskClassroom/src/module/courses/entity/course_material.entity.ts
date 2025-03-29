import { Entity,Column,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, ManyToMany, ManyToOne, JoinTable, JoinColumn } from "typeorm";
import { Courses } from "./courses.entity";

@Entity({name:"course_material"})
export class CourseMaterial{
    @PrimaryGeneratedColumn("uuid")
    c_mat_id!:string;

    @Column()
    c_mat_upload!:string;

    @ManyToOne(()=>Courses,(course)=>course.courseMaterials)
    @JoinColumn({name:"c_id"})
    course!: Courses

    @CreateDateColumn({type:"time with time zone",default:"NOW()"})
    c_mat_created_at!:Date;

    @UpdateDateColumn({type:"time with time zone",default:"NOW()"})
    c_mat_updated_at!:Date;

    @DeleteDateColumn({type:"time with time zone", nullable: true })
    c_mat_deleted_at?:Date;
}