const express=require('express')
require("./db/mongose")
const path=require('path')
const user=require("./models/users")
const diabetic=require("./models/diabetic")
const userRouter=require("./routers/route")


const app=express()

const port=process.env.PORT || 3000
const publicDirectoryPath=path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use(userRouter)


app.listen(port,()=>{
    console.log("server is up and running on ",port)
})