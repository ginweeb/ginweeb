const mongoose = require('mongoose');
const Area = require('../models/area');

exports.area_add = async(req, res, next) => {
    try {
        const area = req.body.area
        const importance = req.body.importance
        if (typeof area === 'undefined') return res.status(400).json({error: "undefined area"});
        if (typeof importance === 'undefined') return res.status(400).json({error: "undefined importance"});
        const db_area = await Area.find({area: area});
        if (db_area.length) return res.status(409).json({error: "area exist"});
        const new_area = await new Area({
            _id: new mongoose.Types.ObjectId(),
            area: area,
            importance: importance
        }).save()
        return res.status(201).json({response: new_area})
    } catch (error) {return res.status(500).json({error: error});}
};

exports.area_get_all = async(req, res, next) => {
    try {
        const db_areas = await Area.find()
        return res.status(200).json({
            response: db_areas
        })
    } catch (error) {return res.status(500).json({error: error});}
};

exports.area_get = async(req, res, next) => {
    try {
        const id = req.params.areaId;
        const db_area = await Area.findOne({_id: id})
        return res.status(200).json({
            response: db_area
        })
    } catch (error) {return res.status(500).json({error: error});}
};

exports.area_remove = async(req, res, next) => {
    try {
        const id = req.params.areaId;
        db_area = await Area.remove({_id: id});
        return res.status(200).json({response: db_area})
    } catch (error) {return res.status(500).json({error: error});}
};

exports.area_edit = async(req, res, next) => {
    try {
        const id = req.params.areaId;
        const importance = req.body.importance
        const db_area = await Area.findOneAndUpdate({_id: id}, {importance: importance})
        return res.status(200).json({response: db_area})
    } catch (error) {return res.status(500).json({error: error});}
};