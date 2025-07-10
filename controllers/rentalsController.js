const Rental = require('../models/rentalModel');

function getAll(req, res) {
  Rental.getAllRentals((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
}

function getById(req, res) {
  const id = req.params.id;
  Rental.getRentalById(id, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ message: 'Rental not found' });
    res.json(row);
  });
}

function create(req, res) {
  const data = req.body;
  Rental.createRental(data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(result);
  });
}

function update(req, res) {
  const id = req.params.id;
  const data = req.body;
  Rental.updateRental(id, data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
}

function remove(req, res) {
  const id = req.params.id;
  Rental.deleteRental(id, (err, result) => {
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
