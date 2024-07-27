 const jwt=require("jsonwebtoken");
 exports.adminverifytoken=(token)=>{
    return jwt.verify(token,"Adminkisecretkeysekarega")
}
