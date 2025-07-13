const express = require('express');
const router = express.Router();
const rentalItemsController = require('../controllers/rentalItemsController');

router.get('/', rentalItemsController.getAll);
router.get('/:id', rentalItemsController.getById);
router.post('/', rentalItemsController.create);
router.put('/:id', rentalItemsController.update);
router.delete('/:id', rentalItemsController.remove);

module.exports = router;


