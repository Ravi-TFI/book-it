const express = require('express');
const cors = require('cors');
require('dotenv').config();
const initializeDatabase = require('./db/init');
const apiRoutes = require('./routes/api');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(express.static('public'));

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  initializeDatabase();
});