const Costume = require('../models/costumeModel');

// מביא את כל התלבושות
function getAll(req, res) {
  Costume.getAllCostumes((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
}

// מביא תלבושת לפי ID
function getById(req, res) {
  const id = req.params.id;
  Costume.getCostumeById(id, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ message: 'Costume not found' });
    res.json(row);
  });
}

// יוצר תלבושת חדשה
function create(req, res) {
  const data = req.body;
  Costume.createCostume(data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(result);
  });
}

// מעדכן תלבושת
function update(req, res) {
  const id = req.params.id;
  const data = req.body;
  Costume.updateCostume(id, data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
}

// מוחק תלבושת
function remove(req, res) {
  const id = req.params.id;
  Costume.deleteCostume(id, (err, result) => {
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
