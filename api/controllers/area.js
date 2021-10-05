const mongoose = require('mongoose');
const Receipt = require('../models/area');

exports.area_add = async(req, res, next) => {
    try {
        return res.status(201).json({
            message: "Area Added"
        })
    } catch (error) {
        return res.status(500).json({
            error: error
        });
    }
};

exports.area_get_all = async(req, res, next) => {
    try {
        return res.status(200).json({
            message: "All Areas Goten"
        })
    } catch (error) {
        return res.status(500).json({
            error: error
        });
    }
};

exports.area_get = async(req, res, next) => {
    try {
        return res.status(200).json({
            message: "Area Goten"
        })
    } catch (error) {
        return res.status(500).json({
            error: error
        });
    }
};

exports.area_remove = async(req, res, next) => {
    try {
        return res.status(200).json({
            message: "Area Removed"
        })
    } catch (error) {
        return res.status(500).json({
            error: error
        });
    }
};

exports.area_edit = async(req, res, next) => {
    try {
        return res.status(200).json({
            message: "Area Edited"
        })
    } catch (error) {
        return res.status(500).json({
            error: error
        });
    }
};