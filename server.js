const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(express.json());

// התחברות או יצירת בסיס נתונים
const db = new sqlite3.Database('./costume_rental.db', (err) => {
  if (err) return console.error(err.message);
  console.log('Connected to SQLite database.');
});

// יצירת טבלאות אם לא קיימות
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      contact_name TEXT,
      phone TEXT,
      email TEXT,
      address TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Costumes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT,
      size TEXT,
      quantity INTEGER NOT NULL,
      price_per_day REAL NOT NULL,
      image_url TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Rentals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      school_id INTEGER,
      start_date TEXT,
      end_date TEXT,
      total_price REAL,
      status TEXT,
      notes TEXT,
      FOREIGN KEY (school_id) REFERENCES Users(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS RentalItems (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      rental_id INTEGER,
      costume_id INTEGER,
      quantity INTEGER NOT NULL,
      price_per_day REAL NOT NULL,
      FOREIGN KEY (rental_id) REFERENCES Rentals(id),
      FOREIGN KEY (costume_id) REFERENCES Costumes(id)
    )
  `);
});

// דוגמה ל־API: קבלת כל התלבושות
app.get('/api/costumes', (req, res) => {
  db.all("SELECT * FROM Costumes", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
