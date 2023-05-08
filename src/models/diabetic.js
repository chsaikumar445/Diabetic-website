const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types


const diabeticSchema = mongoose.Schema({
    date:{  
        type:String,
        required:true,
        trim:true
    },
    timebefore:{
        type:String,
        required:true,
        trim:true
    },
    beforelevel:{
        type:String,
        required:true,
        trim:true
    },
    breakfasttime:{
        type:String,
        default:0,
       
    },
    breakfast:{
        type:String,
        required:true,
        trim:true,
    },
    lunchtime:{
        type:String,
        required:true,
        trim:true,   
    },
    lunch:{
        type:String,
        required:true,
        trim:true,   
    },
    dinnertime:{
        type:String,
        required:true,
        trim:true,    
    },
    dinner:{
        type:String,
        required:true,
        trim:true,   
    },
    aftertime:{
        type:String,
        required:true,
        trim:true, 
    },
    afterlevel:{
        type:String,
        required:true,
        trim:true, 
    },
    postedby:{
        type:String,
        required:true,
        trim:true, 
    }
    
})

//userdef function for hiding private data
diabeticSchema.methods.toJSON = function(){
    const user = this
    const userObj = user.toObject()
    delete userObj.tokens
    return userObj
} 

// diabeticSchema.pre("save",async function (next) {
//     const user =this
//     console.log("user data received")
//     next()
// })


//creating a job model
const diabetic = mongoose.model('diabetic',diabeticSchema)

module.exports=diabetic