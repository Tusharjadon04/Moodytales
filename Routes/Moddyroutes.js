const express=require("express");
const { Createuser, loginUser, Getuser, Deleteuser, Updateuser, modelAi } = require("../Middleware/Moodytales");
const Moodyroute = express.Router()
const AIroute= express.Router()

Moodyroute.post("/Signmoddy",Createuser)// yaha par miidle ware function
Moodyroute.post("/Loginmoddy",loginUser)
Moodyroute.get("/Getmoddy",Getuser)
Moodyroute.post("/Deletemoddy/:id",Deleteuser)
Moodyroute.get("/Updatemoddy",Updateuser)

AIroute.post("/AIdata",modelAi)

module.exports=Moodyroute;
module.exports=AIroute;