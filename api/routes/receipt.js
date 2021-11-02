const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/chech_auth');
const receiptController = require("../controllers/receipt");

const multer = require('multer')
const upload = multer();

router.post('/', checkAuth.chech_auth, upload.single('image'), receiptController.receipt_add);
router.get('/', checkAuth.chech_auth, receiptController.receipt_get_all);
router.get('/:receiptId', checkAuth.chech_auth, receiptController.receipt_get);
router.delete('/:receiptId', checkAuth.chech_auth, receiptController.receipt_remove);
router.delete('/', checkAuth.chech_auth, checkAuth.chech_admin, receiptController.receipt_remove_all);
router.put('/:receiptId', checkAuth.chech_auth, receiptController.receipt_edit);

module.exports = router;