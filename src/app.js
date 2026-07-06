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