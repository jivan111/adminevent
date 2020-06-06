const express=require("express")
const router=express.Router()
const moment=require("moment")
const multer=require("multer")
const GridStorage=require("multer-gridfs-storage")
const Grid=require("gridfs-stream")
const mongoose=require("mongoose")

const dbmodal=require("../dbmodal/event")

const url="mongodb://localhost:27017/eventmanagement"
mongoose.connect(url,{ useNewUrlParser: true ,useUnifiedTopology:true })
const conn=mongoose.connection
let gfs;
conn.once("open",(req,res)=>{
    gfs=Grid(conn.db,mongoose.mongo)
    gfs.collection("eventimage")
})
const storage=new GridStorage({
    url:url,
    file:(req,file)=>{
        return  new  Promise((resolve,reject)=>{
            fileInfo={
                bucketName:"eventimage"
            }
            resolve(fileInfo)
        })

        }
    
})
const upload=multer({storage})
router.get("/",(req,res)=>{
   dbmodal.find({},(err,result)=>{
       if(result.length){
           
            res.render("landingpage",{result})
           
        }else{
            res.render("landingpage",{result:null})

       }
   })
  
})
router.get("/dashboard",(req,res)=>{
    res.render("admin")
})


router.get("/webinar",(req,res)=>{
    dbmodal.find({eventCategory:"Webinar"},(err,result)=>{
        if(!err)
            res.render("landingpage",{result})
        else
            res.send(err)    
        
        })
    })
                

        
router.get("/seminar",(req,res)=>{
    dbmodal.find({eventCategory:"Seminar"},(err,result)=>{
        if(!err)
            res.render("landingpage",{result})
        else
            res.send(err)    
        
        })
})
router.get("/blood_donation",(req,res)=>{
   
    dbmodal.find({eventCategory:"Blood Donation"},(err,result)=>{

        if(!err)
            res.render("landingpage",{result})
        else
            res.send(err)    
        
        })
})
router.get("/meet",(req,res)=>{
    dbmodal.find({eventCategory:"Society Meet"},(err,result)=>{

        if(!err)
            res.render("landingpage",{result})
        else
            res.send(err)    
        
        })
})
router.post("/dashboard",upload.single("file"),(req,res)=>{
    const eventObj={}
    eventObj.eventName=req.body.eventName
    eventObj.eventCategory=req.body.eventCategory
    eventObj.eventDescription=req.body.eventDescription
    eventObj.eventDateTime=req.body.eventDateTime
    const location={}
    location.state=req.body.state
    location.city=req.body.city
    location.locality=req.body.locality
    location.pincode=req.body.pincode
    eventObj.eventLocation=location
    eventObj.fileName=req.file.filename

    
    dbmodal.insertMany(eventObj,(err,result)=>{
        res.json(result)
        console.log(err)
        
    })
})
router.get("/:filename",(req,res)=>{
    let fileName=req.params.filename
    gfs.files.find({filename:fileName}).toArray((err,result)=>{
       let readStream= gfs.createReadStream(result[0].filename)
       readStream.pipe(res)
    })
})
module.exports=router