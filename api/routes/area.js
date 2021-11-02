const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/chech_auth');
const areaController = require("../controllers/area");

router.post('/', checkAuth.chech_auth, checkAuth.chech_admin, areaController.area_add);
router.delete('/:areaId', checkAuth.chech_auth, checkAuth.chech_admin, areaController.area_remove);
router.get('/', checkAuth.chech_auth, areaController.area_get_all);
router.get('/:areaId', checkAuth.chech_auth, areaController.area_get);
router.put('/:areaId', checkAuth.chech_auth, checkAuth.chech_admin, areaController.area_edit);

module.exports = router;