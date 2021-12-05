const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/chech_auth');
const userController = require("../controllers/user");
const receiptController = require("../controllers/receipt");

router.get('/me', checkAuth.chech_auth, userController.user_get_me);
router.post('/register', userController.user_register);
router.post('/login', userController.user_singup);
router.delete('/:userId', checkAuth.chech_auth, userController.user_remove);
router.get('/', checkAuth.chech_auth, userController.user_get_all);
router.get('/:userId', checkAuth.chech_auth, userController.user_get);
router.put('/:userId', checkAuth.chech_auth, userController.user_edit);

router.get('/:userId/receipt', checkAuth.chech_auth, receiptController.user_receipt_get_all);
router.get('/:userId/area/:areaId/receipt', checkAuth.chech_auth, checkAuth.chech_admin, receiptController.user_area_receipt_get_all);

module.exports = router;
