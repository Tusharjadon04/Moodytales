const express = require("express")
const { modelAi } = require("../Middleware/Aimiddle")
const AIroute=express.Router()

AIroute.put("/Aidata",modelAi)
module.exports=AIroute;