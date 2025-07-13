const RentalItem = require('../models/renatalItemModel');

function getAll(req, res) {
  RentalItem.getAllRentalItems((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
}

function getById(req, res) {
  const id = req.params.id;
  RentalItem.getRentalItemById(id, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ message: 'Rental item not found' });
    res.json(row);
  });
}

function create(req, res) {
  const data = req.body;
  RentalItem.createRentalItem(data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(result);
  });
}

function update(req, res) {
  const id = req.params.id;
  const data = req.body;
  RentalItem.updateRentalItem(id, data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
}

function remove(req, res) {
  const id = req.params.id;
  RentalItem.deleteRentalItem(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
