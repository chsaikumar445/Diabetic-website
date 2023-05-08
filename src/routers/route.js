const User=require("../models/users")
const diabetic=require("../models/diabetic")
const express=require("express")
const auth=require("../middleWare/auth")
const {sendPasswordEmail}=require("../account")


const router = new express.Router()

router.get("/test",(req,res)=>{
    res.send({
        name:"server is working"
    })
})

//endpoint for creating user
router.post("/user",async(req,res)=>{
    console.log(req.body);
    const user = new User(req.body)
    console.log(user)
    try{
     await user.save()
     const token = await user.genAuthToken()
    //  sendWelcomeEmail(user.email)
    // console.log("email sent")
    //  res.cookie("Authorization",token)     
    //  res.cookie("type","student")     
     res.status(201).send({user,token})
    }catch(e){
        console.log(e)
     res.status(400).send({error:"unable to register"})
    }
 
 })


 router.post("/login",async(req,res)=>{
    try{
    const user = await User.findByCredentials(req.body.email, req.body.password,req.body.question1,req.body.question2,req.body.question3,req.body.answer1,req.body.answer2,req.body.answer3,req.body.image)
    if(!user.block){
    const token = await user.genAuthToken()
    res.cookie("Authorization",token)
    res.send({user,token})
    }
    else res.status(400).send({error:"User blocked! Don't worry! Contact Admin!"})
    }
    catch(e){
        console.log(e.message)
        res.status(400).send({error:e.message})
    }

 })

 router.post("/password-reset", async(req,res)=>{
    const email=req.body.email
    console.log("Email ",email)
    try{
        console.log("inside");
        const user = await User.findByEmail(email)
        console.log(user,"user in route")
        const secret=Jwt_Secret + user.password
        const payload={
            email:user.email,
            id:user.id
        }
        const token=jwt.sign(payload,secret,{expiresIn:'15m'})
        const link=`http://localhost:4000/resetpassword.html?id=${user.id}&token=${token}&type=student`
        sendPasswordEmail(email,link)
        console.log("secret",secret)
        console.log("token before mail",token)
        res.send({success:"link sent"})
    }
    catch(e){
        res.send({error:"unable to reset password"})
    }
})

router.post("/reset-password", async(req,res)=>{
    const { id, token } =req.body
    const {password,question1,question2,question3,answer1,answer2,answer3,image}=req.body
    console.log(id,"id")
    try {
        console.log("user got it")
        const user = await User.findUserById(id)
        console.log(user)
        const secret=Jwt_Secret + user.password
        console.log("seceret after mail",secret)
        console.log("token after mail",token)
        const payload=jwt.verify(token,secret)
        console.log("payload ",payload)
        // console.log("user ",user)
        user.password=password
        user.question1=question1
        user.question2=question2
        user.question3=question3
        user.answer1=answer1
        user.answer2=answer2
        user.answer3=answer3
        user.image=image
        await user.save()
        console.log("success")
        res.send({success:"true"})
    } catch (e) {
        res.status(400).send(e)
    }
})

 //endpoint for logout user
 router.post("/user/logout",auth, async(req,res) =>{
    console.log("logout clicked");
     try{
        console.log("logout clicked");
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token != req.token
        })
        await req.user.save()
        res.clearCookie('Authorization')
        res.send()
     }
     catch(e){
         res.status(500).send({error:"unable to logout"})
     }
 })
 
 
 router.post("/user/diabetic", async(req,res)=>{
    const data = new diabetic(req.body)
    console.log(data)
    try{
     await data.save() 
     res.status(201).send({"status":"ok"})
    }catch(e){
        console.log(e)
     res.status(400).send({error:"unable to post"})
    }
 })
 
 router.get("/user/diabeticdata", async(req,res)=>{
    try{
        const userid = req.query.userid
        var diabetics = await diabetic.find()
        var newResults=[]

        for(i=0;i<diabetics.length;i++){
            if(userid.toString()==diabetics[i].postedby.toString()){
                            newobj = {...diabetics[i]._doc}
                            newResults.push(newobj)
            }
        }
    res.status(200).send({newResults})
}catch(e){
    res.status(400).send({error:e})
}
 })

module.exports = router