const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/chech_auth');
const receiptController = require("../controllers/receipt");

router.post('/', receiptController.receipt_add);
router.get('/', receiptController.receipt_get_all);
router.get('/:receiptId', receiptController.receipt_get);
router.delete('/:receiptId', receiptController.receipt_remove);
router.put('/:receiptId', receiptController.receipt_edit);

module.exports = router;