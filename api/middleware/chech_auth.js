const jwt = require('jsonwebtoken');

exports.chech_auth = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, "gingin");
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({message: "Auth failed"});
    }
};

exports.chech_admin = (req, res, next) => {
    console.log(req.userData)
    if(req.userData.role != 3) return res.status(401).json({message: "Auth failed"});
    next();
};