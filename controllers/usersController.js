const User = require('../models/userModel');

function getAll(req, res) {
  User.getAllUsers((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
}

function getById(req, res) {
  const id = req.params.id;
  User.getUserById(id, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ message: 'User not found' });
    res.json(row);
  });
}

function create(req, res) {
  const data = req.body;
  User.createUser(data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(result);
  });
}

function update(req, res) {
  const id = req.params.id;
  const data = req.body;
  User.updateUser(id, data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
}

function remove(req, res) {
  const id = req.params.id;
  User.deleteUser(id, (err, result) => {
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
