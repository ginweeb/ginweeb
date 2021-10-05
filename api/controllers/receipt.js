const mongoose = require('mongoose');
const Receipt = require('../models/receipt');

exports.receipt_add = async(req, res, next) => {
    try {
        return res.status(201).json({
            message: "Add"
        })
    } catch (error) {
        return res.status(999).json({
            error: error
        });
    }
};

exports.receipt_get_all = async(req, res, next) => {
    try {
        return res.status(200).json({
            message: "Get All",
            res: []
        })
    } catch (error) {
        return res.status(999).json({
            error: error
        });
    }
};

exports.receipt_get = async(req, res, next) => {
    r_id = req.params.receiptId;
    try {
        return res.status(200).json({
            message: "Get One",
            receiptId: r_id
        })
    } catch (error) {
        return res.status(999).json({
            error: error
        });
    }
};

exports.receipt_remove = async(req, res, next) => {
    r_id = req.params.receiptId;
    try {
        return res.status(200).json({
            message: "Delete One",
            receiptId: r_id
        })
    } catch (error) {
        return res.status(999).json({
            error: error
        });
    }
};

exports.receipt_remove_all = async(req, res, next) => {
    try {
        return res.status(200).json({
            message: "Delete All"
        })
    } catch (error) {
        return res.status(999).json({
            error: error
        });
    }
};

exports.receipt_edit = async(req, res, next) => {
    r_id = req.params.receiptId;
    try {
        return res.status(200).json({
            message: "Edit",
            receiptId: r_id
        })
    } catch (error) {
        return res.status(999).json({
            error: error
        });
    }
};

exports.user_receipt_get_all = async(req, res, next) => {
    u_id = req.params.userID;
    try {
        return res.status(200).json({
            message: "Get All",
            userID: u_id
        })
    } catch (error) {
        return res.status(999).json({
            error: error
        });
    }
};

exports.user_receipt_get_one = async(req, res, next) => {
    u_id = req.params.userID;
    r_id = req.params.receiptId;
    try {
        return res.status(200).json({
            message: "Get One",
            userID: u_id,
            receiptId: r_id
        })
    } catch (error) {
        return res.status(999).json({
            error: error
        });
    }
};

exports.user_receipt_delete = async(req, res, next) => {
    u_id = req.params.userID;
    r_id = req.params.receiptId;
    try {
        return res.status(200).json({
            message: "Delete one",
            userID: u_id,
            receiptId: r_i
        })
    } catch (error) {
        return res.status(999).json({
            error: error
        });
    }
};

exports.user_receipt_add = async(req, res, next) => {
    u_id = req.params.userID;
    try {
        return res.status(201).json({
            message: "Add",
            userID: u_id,
            receiptId: r_i
        })
    } catch (error) {
        return res.status(999).json({
            error: error
        });
    }
};

exports.user_receipt_edit = async(req, res, next) => {
    u_id = req.params.userID;
    r_id = req.params.receiptId;
    try {
        return res.status(200).json({
            message: "Edit",
            userID: u_id,
            receiptId: r_i
        })
    } catch (error) {
        return res.status(999).json({
            error: error
        });
    }
};

exports.user_area_receipt_get_all = async(req, res, next) => {
    u_id = req.params.userId;
    a_id = req.params.areaId;
    try {
        return res.status(200).json({
            message: "Get All",
            userID: u_id,
            areaID: a_id,
        })
    } catch (error) {
        return res.status(999).json({
            error: error
        });
    }
};

exports.user_area_receipt_get_one = async(req, res, next) => {
    u_id = req.params.userId;
    a_id = req.params.areaId;
    r_id = req.params.receiptId;
    try {
        return res.status(200).json({
            message: "Get OOne",
            userID: u_id,
            areaID: a_id,
            receiptId: r_id
        })
    } catch (error) {
        return res.status(999).json({
            error: error
        });
    }
};