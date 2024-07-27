const express = require("express");
const {  LoginAdmin, CreateAdmin } = require("../Middleware/AdminMiddle");

const AdminRoute = express.Router();

AdminRoute.post("/createadmin", CreateAdmin);
AdminRoute.post("/loginadmin", LoginAdmin);

module.exports=AdminRoute;
