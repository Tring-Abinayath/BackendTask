import { DataSource } from "typeorm";
import { config } from "dotenv";
config()

export const postgresDataSource= new DataSource({
    type:"postgres",
    host:process.env.DB_HOST,
    port:Number(process.env.DB_PORT),
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    entities:["src/module/**/entity/*.entity.ts"],
    synchronize:false,
    migrations:["src/db/migration/*.ts"]
})

postgresDataSource.initialize()
.then(()=>{
    console.log("Database connected successfully")
})
.catch((err)=>{
    console.log("Error during dataSource initialization",err)
})

