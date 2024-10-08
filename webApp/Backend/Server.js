const express = require('express');
const connection = require("./config/connection.js"); 
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Item routes 
app.use("/items", require("./routes/item"));

// User routes
app.use("/user", require("./routes/user"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
