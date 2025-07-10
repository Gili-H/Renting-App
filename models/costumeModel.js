const db = require('../db/database');

// מביא את כל התלבושות
function getAllCostumes(callback) {
  const sql = `SELECT * FROM Costumes`;
  db.all(sql, [], callback);
}

// מביא תלבושת לפי ID
function getCostumeById(id, callback) {
  const sql = `SELECT * FROM Costumes WHERE id = ?`;
  db.get(sql, [id], callback);
}

// מוסיף תלבושת חדשה
function createCostume(data, callback) {
  const sql = `
    INSERT INTO Costumes (name, category, size, quantity, price_per_day, image_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const params = [
    data.name,
    data.category,
    data.size,
    data.quantity,
    data.price_per_day,
    data.image_url || null
  ];
  db.run(sql, params, function (err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID, ...data });
  });
}

// מעדכן תלבושת קיימת
function updateCostume(id, data, callback) {
  const sql = `
    UPDATE Costumes
    SET name = ?, category = ?, size = ?, quantity = ?, price_per_day = ?, image_url = ?
    WHERE id = ?
  `;
  const params = [
    data.name,
    data.category,
    data.size,
    data.quantity,
    data.price_per_day,
    data.image_url || null,
    id
  ];
  db.run(sql, params, function (err) {
    if (err) return callback(err);
    callback(null, { updated: this.changes });
  });
}

// מוחק תלבושת
function deleteCostume(id, callback) {
  const sql = `DELETE FROM Costumes WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) return callback(err);
    callback(null, { deleted: this.changes });
  });
}

module.exports = {
  getAllCostumes,
  getCostumeById,
  createCostume,
  updateCostume,
  deleteCostume
};
