const express =require("express")

const app=express()
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
const router=require("./router_api")
app.set("view engine","ejs")
app.use("/",router)

app.listen("3000",()=>{
    console.log("running on 3000")
})