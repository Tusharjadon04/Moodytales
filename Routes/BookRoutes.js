const express = require("express");
const { Addbook, GetBook, DeleteBook, GetAllBooks, UpdateBook, DeleteAllBooks } = require("../Middleware/BookMiddle");
const { authMiddleware } = require("../Middleware/authmiddleware");




const Bookroutes = express.Router();




Bookroutes.post("/createbook",authMiddleware,Addbook);
Bookroutes.get("/getbook/:id",GetBook);
Bookroutes.post("/deletebook/:id",authMiddleware,DeleteBook);
Bookroutes.post("/deletebooks",authMiddleware,DeleteAllBooks);
Bookroutes.get("/getallbooks",GetAllBooks);
Bookroutes.post("/updatebook/:id",authMiddleware,UpdateBook);

module.exports=Bookroutes
