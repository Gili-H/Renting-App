const express = require('express');
const app = express();
const port = 3000;

const costumesRoutes = require('./routes/costumes');
const usersRoutes = require('./routes/users');
const rentalsRoutes = require('./routes/rentals');
const rentalItemsRoutes = require('./routes/rentalItems');

app.use(express.json());

app.use('/api/costumes', costumesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/rentals', rentalsRoutes);
app.use('/api/rental-items', rentalItemsRoutes);

app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
