const db = require('../db/database');

// מביא את כל פרטי ההשכרות
function getAllRentalItems(callback) {
  const sql = `SELECT * FROM RentalItems`;
  db.all(sql, [], callback);
}

// מביא פריט השכרה לפי ID
function getRentalItemById(id, callback) {
  const sql = `SELECT * FROM RentalItems WHERE id = ?`;
  db.get(sql, [id], callback);
}

// מוסיף פריט השכרה חדש
function createRentalItem(data, callback) {
  const sql = `
    INSERT INTO RentalItems (rental_id, costume_id, quantity, price_per_day)
    VALUES (?, ?, ?, ?)
  `;
  const params = [
    data.rental_id,
    data.costume_id,
    data.quantity,
    data.price_per_day
  ];
  db.run(sql, params, function (err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID, ...data });
  });
}

// מעדכן פריט השכרה קיים
function updateRentalItem(id, data, callback) {
  const sql = `
    UPDATE RentalItems
    SET rental_id = ?, costume_id = ?, quantity = ?, price_per_day = ?
    WHERE id = ?
  `;
  const params = [
    data.rental_id,
    data.costume_id,
    data.quantity,
    data.price_per_day,
    id
  ];
  db.run(sql, params, function (err) {
    if (err) return callback(err);
    callback(null, { updated: this.changes });
  });
}

// מוחק פריט השכרה
function deleteRentalItem(id, callback) {
  const sql = `DELETE FROM RentalItems WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) return callback(err);
    callback(null, { deleted: this.changes });
  });
}

module.exports = {
  getAllRentalItems,
  getRentalItemById,
  createRentalItem,
  updateRentalItem,
  deleteRentalItem
};
