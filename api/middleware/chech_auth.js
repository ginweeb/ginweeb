const jwt = require('jsonwebtoken');

exports.chech_auth = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, "gingin");
        req.userData = decoded;
        console.log(req.userData)
        next();
    } catch (error) {
        return res.status(401).json({message: "Auth failed"});
    }
};

exports.chech_admin = (req, res, next) => {
    if(req.userData.role != 0) return res.status(401).json({message: "Auth failed"});
    next();
};