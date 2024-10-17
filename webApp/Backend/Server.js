const express = require('express');
const connection = require("./config/connection.js"); 
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const upload = require("./middleware/upload.js");
dotenv.config(); 
connection();
const app = express();
const port = process.env.PORT || 4000;



app.get('/health', (req, res) => {
  res.status(200).send({ msg: "API is up and running!" });
});
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

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send({ msg: "Something went wrong!", status: false });
// });

