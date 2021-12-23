const path = require('path');
const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;
const connectionString = process.env.DATABASE_URL || "postgresql://localhost:5432/flights";

const pool = new Pool({ connectionString });



app.use(express.static(path.join(__dirname, 'dist')));

app.get('/test', (req, res) => {
     pool.query('SELECT * FROM leads LIMIT 10', (err, response) => {
          console.log(response.rows);
          response.rows.forEach((row) => {
               res.json(row);
          });
          pool.end();
     })
})

app.listen(PORT, () => {
     console.log("Listening on port: " + PORT);
});