const express = require('express');
const router = express.Router();
const rentalsController = require('../controllers/rentalsController');

router.get('/', rentalsController.getAll);
router.get('/:id', rentalsController.getById);
router.post('/', rentalsController.create);
router.put('/:id', rentalsController.update);
router.delete('/:id', rentalsController.remove);

module.exports = router;
