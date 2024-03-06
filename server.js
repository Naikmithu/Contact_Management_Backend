const express=require("express")
const errorHandler=require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");
const dotenv=require('dotenv').config();

const app=express();

connectDb()

const port=process.env.PORT || 4000

app.use(express.json()) // allows body passed by client to parse through request in json
app.use("/api/contacts",require("./routes/contactRoutes"));//middleware
app.use("/api/users",require("./routes/userRoutes"));//middleware authentication

app.use(errorHandler)

app.listen(port,()=>{
    console.log("HI i'm active")
})
