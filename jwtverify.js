var jwt = require('jsonwebtoken');
exports.verifytoken=(token)=>{
    return jwt.verify(token,"terenamaaiwatansathiyo")
}