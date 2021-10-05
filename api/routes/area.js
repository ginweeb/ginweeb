const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/chech_auth');
const areaController = require("../controllers/area");

router.post('/', areaController.area_add);
router.delete('/:receiptId', areaController.area_remove);
router.get('/', areaController.area_get_all);
router.get('/:receiptId', areaController.area_get);
router.put('/:receiptId', areaController.area_edit);

module.exports = router;