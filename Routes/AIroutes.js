const express = require("express")
const { modelAi } = require("../Middleware/Aimiddle")
const AIroute=express.Router()

AIroute.get("/Aidata",modelAi)
module.exports=AIroute;