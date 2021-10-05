const jwt = require('jsonwebtoken');

exports.chech_auth = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.JWT_SALT);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({message: "Auth failed"});
    }
};