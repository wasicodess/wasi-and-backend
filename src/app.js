import express from "express"
export const app= express()
export const port=process.env.PORT || 8000
import cors from "cors"
import cookieParser from "cookie-parser";


// some basic middleware 
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(cookieParser())

app.use(express.json({
    limit:"16kb"
}))
app.use(express.static("public"))
app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))
app.use((req, res, next) => {
    console.log("Incoming Request:", req.method, req.url);
    next();
});
//import router
import userRouter from "./Routes/user.routes.js";
//syntax
app.use("/api/v1/user",userRouter)
export default app;