const express = require('express');
const app = express();
const port = 8000;

const pool = require('./db');

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
