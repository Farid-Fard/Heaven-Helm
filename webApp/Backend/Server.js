const express = require('express');
const connection = require("./config/connection.js"); 
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Task routes
app.use("/item", require("./routes/item"));


//user routes
app.use("/user", require("./routes/user.js"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
