const mongoose=require("mongoose")
const Schema= mongoose.Schema
const eventSchema=new Schema({
   eventName:{
       type:String,
       required:true
   },
   eventCategory:{
       type:String,
       required:true
   },
   eventDescription:{
       type:String,
       required:true
   },
   eventDateTime:{
       type:Date,
       required:true
   },
   eventLocation:{
       state:String,
       city:String,
       locality:String,
       pincode:Number
    },
    fileName:{
        type:String,
        required:true
    }
 })


       
module.exports=mongoose.model("eventModel",eventSchema)