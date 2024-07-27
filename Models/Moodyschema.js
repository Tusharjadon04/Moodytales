const mongoose = require ("mongoose")
const Moddyshema = mongoose.Schema({
    Username:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
    },
    Phonenumber:{
        type:Number,
        required:true,
    },
    Password:{
        type:String,
        required:true,
    }
})
const Moddy  = mongoose.model("moddys",Moddyshema)
module.exports=Moddy;