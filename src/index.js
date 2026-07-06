import dotenv from "dotenv";
dotenv.config({
    path : './.env'
})
import connectDB from "./db/index.js";
import { app, port } from "./app.js";

connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running at ${port}`);
    })
})
.catch((error)=>{
    console.log("connection error",error);
})