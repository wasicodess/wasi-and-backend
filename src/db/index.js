import mongoose from "mongoose";
import {dbName} from "../constants.js";
console.log("MONGODB_URI:", process.env.MONGODB_URI);
const connectDB = async()=>{
    try{
       const connect= await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`)
       console.log(`/n MongoDb connected !! DB host: ${connect.connection.host}`);
    }
    catch(error){
       console.log("monogo db error",error);
       process.exit(1);
    }
}
export default connectDB;