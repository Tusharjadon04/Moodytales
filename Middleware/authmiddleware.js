const { adminverifytoken } = require("./Adminjwtverify");


exports.authMiddleware = (req, res,next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = adminverifytoken(token)
        console.log(decoded);
         req.admin = decoded;
         next();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};