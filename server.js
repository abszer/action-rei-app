const path = require('path');
const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;
// const connectionString = process.env.DATABASE_URL || "postgresql://localhost:5432/flights";

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized=false } });



app.use(express.static(path.join(__dirname, 'dist')));

app.get('/test', (req, res) => {
     console.log(pool);
     pool.query('SELECT * FROM leads')
          .then((response) => {
               res.json(response);
               console.log(response);
          })
          .catch((err) => {
               res.send(err);
          });
          pool.end();
          console.log('pool drained');
})

app.listen(PORT, () => {
     console.log("Listening on port: " + PORT);
});