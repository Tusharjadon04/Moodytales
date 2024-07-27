const mongoose= require("mongoose")
mongoose.connect("mongodb+srv://tusharjadon605:123456963@terenaam.xczmcru.mongodb.net/").then(()=>{
    console.log("my db is connect with my database");
})
.catch((error)=>{
    console.log("Error:",error);
})