const mongoose=require("mongoose")

const contactSchema=mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true],
        ref: "User",
      },
    name:{
       type:String,
       required:[true,"Please add your contact Name"],
    },
    Phone:{
        type:String,
        required:[true,"Please add your contact Phone Number"],
     },
    email:{
        type:String,
        required:[true,"Please add your contact Email Address"],
     },

    
},

{
    timestamps:true,
}
);

module.exports=mongoose.model("Contact",contactSchema)