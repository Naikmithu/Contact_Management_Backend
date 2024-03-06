const mongoose=require("mongoose")
const config = require("config");
const asyncHandler = require("express-async-handler"); //handls expeceptions


const connectDb = asyncHandler(async()=>{
    
        const connect=await mongoose.connect(config.get("CONNECTION_STRING"))
        console.log("Database connected")
    
   
})

module.exports=connectDb