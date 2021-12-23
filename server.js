const path = require('path');
const express = require('express');
const { Client } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;
// const connectionString = process.env.DATABASE_URL || "postgresql://localhost:5432/flights";

const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
client.connect(() => {
     console.log("connected to postgres");
})



app.use(express.static(path.join(__dirname, 'dist')));

app.get('/test', (req, res) => {
     client.query('SELECT * FROM leads', (err, response) => {
          if (err) res.send(err);
          res.json(response.rows);
     })
})

app.listen(PORT, () => {
     console.log("Listening on port: " + PORT);
});