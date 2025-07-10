const db = require('../db/database');

// מביא את כל ההזמנות
function getAllRentals(callback) {
  const sql = `SELECT * FROM Rentals`;
  db.all(sql, [], callback);
}

// מביא הזמנה לפי ID
function getRentalById(id, callback) {
  const sql = `SELECT * FROM Rentals WHERE id = ?`;
  db.get(sql, [id], callback);
}

// מוסיף הזמנה חדשה
function createRental(data, callback) {
  const sql = `
    INSERT INTO Rentals (school_id, start_date, end_date, total_price, status, notes)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const params = [
    data.school_id,
    data.start_date,
    data.end_date,
    data.total_price,
    data.status,
    data.notes
  ];
  db.run(sql, params, function (err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID, ...data });
  });
}

// מעדכן הזמנה קיימת
function updateRental(id, data, callback) {
  const sql = `
    UPDATE Rentals
    SET school_id = ?, start_date = ?, end_date = ?, total_price = ?, status = ?, notes = ?
    WHERE id = ?
  `;
  const params = [
    data.school_id,
    data.start_date,
    data.end_date,
    data.total_price,
    data.status,
    data.notes,
    id
  ];
  db.run(sql, params, function (err) {
    if (err) return callback(err);
    callback(null, { updated: this.changes });
  });
}

// מוחק הזמנה
function deleteRental(id, callback) {
  const sql = `DELETE FROM Rentals WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) return callback(err);
    callback(null, { deleted: this.changes });
  });
}

module.exports = {
  getAllRentals,
  getRentalById,
  createRental,
  updateRental,
  deleteRental
};
