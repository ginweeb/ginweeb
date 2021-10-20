const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/chech_auth');
const areaController = require("../controllers/area");

router.post('/', areaController.area_add);
router.delete('/:areaId', areaController.area_remove);
router.get('/', areaController.area_get_all);
router.get('/:areaId', areaController.area_get);
router.put('/:areaId', areaController.area_edit);

module.exports = router;