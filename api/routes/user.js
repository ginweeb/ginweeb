const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/chech_auth');
const userController = require("../controllers/user");
const receiptController = require("../controllers/receipt");

router.post('/register', userController.user_register);
router.post('/login', userController.user_singup);
router.delete('/:userId', userController.user_remove);
router.get('/', userController.user_get_all);
router.get('/:userId', userController.user_get);
router.put('/:userId', userController.user_edit);

router.get('/:userId/receipt', receiptController.user_receipt_get_all);
router.get('/:userId/receipt/:receiptId', receiptController.user_receipt_get_one);
router.delete('/:userId/receipt/:receiptId', receiptController.user_receipt_delete);
router.put('/:userId/receipt/:receiptId', receiptController.user_receipt_edit);
router.post('/:userId/receipt', receiptController.user_receipt_add);

router.get('/:userId/area/:areaId/receipt/:receiptId', receiptController.user_area_receipt_get_one);
router.get('/:userId/area/:areaId/receipt', receiptController.user_area_receipt_get_all);

module.exports = router;
