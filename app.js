require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// routes
const products = require("./routes/api/products");
const users = require("./routes/api/users");

connectDB();
const port = process.env.PORT || 8082;

app.use(cors());

// parse application/json
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));

// use routes
app.use("/api/products", products);
app.use("/api/users", users);

app.listen(port, () => console.log(`Server running on port ${port}`));
