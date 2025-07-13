const express = require('express');
const router = express.Router();
const costumesController = require('../controllers/costumesController');

router.get('/', costumesController.getAll);
router.get('/:id', costumesController.getById);
router.post('/', costumesController.create);
router.put('/:id', costumesController.update);
router.delete('/:id', costumesController.remove);

module.exports = router;
