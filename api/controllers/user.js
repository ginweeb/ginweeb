const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.user_register = async(req, res, next) => {
    try {
        const role = req.body.role;
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        if (!email) return res.status(400).json({error: "undefined email"});
        if (!username) return res.status(400).json({error: "undefined username"});
        if (!password) return res.status(400).json({error: "undefined password"});
        const res_e = await User.find({email: email});
        const res_u = await User.find({username: username});
        if(res_e.length) return res.status(409).json({error: "email exist"});
        if(res_u.length) return res.status(409).json({error: "username exist"});
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: email,
            username: username,
            password: await bcrypt.hash(password, 10),
            role: role
        })
        const new_user = await user.save();
        return res.status(201).json({response: new_user})
    } catch (error) {return res.status(500).json({error: error});}
};

exports.user_singup = async(req, res, next) => {
    try {
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        if (!email) return res.status(400).json({error: "undefined email"});
        if (!password) return res.status(400).json({error: "undefined password"});
        const user = await User.findOne({email: email});
        if(user === null) return res.status(401).json({error: "auth failed"});
        if(!await bcrypt.compare(password, user.password)) return res.status(401).json({error: "auth failed"});
        const token = jwt.sign(
            {
                email: user.email,
                username: user.username,
                uid: user._id,
                role: user.role
            },
            "gingin",
            {
                expiresIn: "1h"
            }
        );
        return res.status(200).json({response: "Auth succesful", token: token});
    } catch (error) {return res.status(500).json({error: error});}
};

exports.user_remove = async(req, res, next) => {
    try {
        const id = req.params.userId;
        result = await User.remove({_id: id});
        return res.status(200).json({response: result})
    } catch (error) {return res.status(500).json({error: error});}
};

exports.user_get_all = async(req, res, next) => {
    try {
        const users = await User.find().select('-password');
        return res.status(200).json({
            users: users
        })
    } catch (error) {return res.status(500).json({error: error});}
};

exports.user_get = async(req, res, next) => {
    try {
        const id = req.params.userId;
        const user = await User.findOne({_id: id}).select('-password');
        return res.status(200).json({
            user: user
        })
    } catch (error) {return res.status(500).json({error: error});}
};

exports.user_edit = async(req, res, next) => {
    try {
        const id = req.params.userId;
        const email = req.body.email;
        const username = req.body.username;
        const password = await bcrypt.hash(req.body.password, 10);
        const update = {
            email: email,
            username: username,
            password: password
        }
        const res_e = await User.find({email: email});
        const res_u = await User.find({username: username});
        if(res_e.length) return res.status(409).json({error: "email exist"});
        if(res_u.length) return res.status(409).json({error: "username exist"});
        await User.findOneAndUpdate({_id: id}, update)
        const user = await User.findOne({_id: id}).select('-password');
        if(user === null) return res.status(401).json({error: "no user"});
        return res.status(200).json({user: user})
    } catch (error) {
        return res.status(500).json({error: error});
    }
};