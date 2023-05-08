require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// routes
const products = require("./routes/api/products");

connectDB();
const port = process.env.PORT || 8082;
// app.use("products", products);

app.use(cors());
// use routes
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use("/api/products", products);

app.listen(port, () => console.log(`Server running on port ${port}`));
