const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.user_register = async(req, res, next) => {
    try {
        if (typeof req.body.email === 'undefined') throw "email undefined"
        if (typeof req.body.password === 'undefined') throw "email password"
        const result1 = await User.find({email: req.body.email});
        if(result1.length) return res.status(409).json({message: "Mail exist"})
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10)
        });
        const result = await user.save();
        return res.status(201).json(result)
    } catch (error) {
        return res.status(500).json({error: error});
    }
};

exports.user_singup = async(req, res, next) => {
    try {
        user = await User.find({email: req.body.email});
        if(!user.length) return res.status(401).json({message: "Auth failed"});
        if(!await bcrypt.compare(req.body.password, user[0].password)) return res.status(401).json({message: "Auth failed"});
        const token = jwt.sign(
            {
                email: user[0].email,
                uid: user[0]._id
            },
            process.env.JWT_SALT,
            {
                expiresIn: "1h"
            },
        );
        return res.status(200).json({message: "Auth succesful", "token":token});
    } catch (error) {
        return res.status(500).json({error: error});
    }
};

exports.user_remove = async(req, res, next) => {
    try {
        const id = req.params.userID;
        result = await User.remove({_id: id});
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({error: error});
    }
};

exports.user_get_all = async(req, res, next) => {
    try {
        return res.status(200).json({
            users: []
        })
    } catch (error) {
        return res.status(500).json({error: error});
    }
};

exports.user_get = async(req, res, next) => {
    try {
        const id = req.params.userID;
        return res.status(200).json({
            user: {id: id}
        })
    } catch (error) {
        return res.status(500).json({error: error});
    }
};

exports.user_edit = async(req, res, next) => {
    try {
        const id = req.params.userID;
        return res.status(200).json({
            user: {id: id}
        })
    } catch (error) {
        return res.status(500).json({error: error});
    }
};