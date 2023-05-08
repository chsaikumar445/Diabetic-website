const nodemailer = require("nodemailer");


const sendPasswordEmail=(email,link)=>{    
    
    const passwordMsg={
        from:"studentinternship1234@gmail.com",
        to:email,
        subject:"password reset mail",
        html:`<div><h4>Hi, Here is the link for reset password for your account in student internship portal\n kindly reset the password\n Note:The link is only vaild for fifteen minutes after that the link expries</h4><a href=${link}>Password reset link</a>`
    }

    nodemailer.createTransport({
        service:"gmail",
        auth:{
        user:"sakethsomaraju12@gmail.com",
        pass:"cslvybtbtpajktqv"
        },
        port:465,
        host:"smtp.gmail.com"
    }).sendMail(passwordMsg,(err)=>{
        if(err){
        return console.log("error occurs",err)
        }else{
        return console.log("email sent")
        }
    })
}



module.exports={
    sendPasswordEmail
}