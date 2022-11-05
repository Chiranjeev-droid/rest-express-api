const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 4500;

app.listen(PORT);
console.log(`Server is working on port ${PORT} `);
