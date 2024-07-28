const express=require("express");
const { Createuser, loginUser, Getuser, Deleteuser, Updateuser } = require("../Middleware/Moodytales");

const Moodyroute = express.Router()


Moodyroute.post("/Signmoddy",Createuser)// yaha par miidle ware function
Moodyroute.post("/Loginmoddy",loginUser)
Moodyroute.get("/Getmoddy",Getuser)
Moodyroute.post("/Deletemoddy/:id",Deleteuser)
Moodyroute.get("/Updatemoddy",Updateuser)

module.exports=Moodyroute