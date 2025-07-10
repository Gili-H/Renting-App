const db = require('../db/database');

// מביא את כל הלקוחות
function getAllUsers(callback) {
  const sql = `SELECT * FROM Users`;
  db.all(sql, [], callback);
}

// מביא לקוח לפי ID
function getUserById(id, callback) {
  const sql = `SELECT * FROM Users WHERE id = ?`;
  db.get(sql, [id], callback);
}

// מוסיף לקוח חדש
function createUser(data, callback) {
  const sql = `
    INSERT INTO Users (name, contact_name, phone, email, address)
    VALUES (?, ?, ?, ?, ?)
  `;
  const params = [
    data.name,
    data.contact_name,
    data.phone,
    data.email,
    data.address
  ];
  db.run(sql, params, function (err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID, ...data });
  });
}

// מעדכן לקוח קיים
function updateUser(id, data, callback) {
  const sql = `
    UPDATE Users
    SET name = ?, contact_name = ?, phone = ?, email = ?, address = ?
    WHERE id = ?
  `;
  const params = [
    data.name,
    data.contact_name,
    data.phone,
    data.email,
    data.address,
    id
  ];
  db.run(sql, params, function (err) {
    if (err) return callback(err);
    callback(null, { updated: this.changes });
  });
}

// מוחק לקוח
function deleteUser(id, callback) {
  const sql = `DELETE FROM Users WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) return callback(err);
    callback(null, { deleted: this.changes });
  });
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
