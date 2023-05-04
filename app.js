require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();

// routes
const products = require("./routes/api/products");

connectDB();
const port = process.env.PORT || 8082;
// app.use("products", products);

// use routes
app.use("/api/products", products);

app.listen(port, () => console.log(`Server running on port ${port}`));

// const { MongoClient } = require("mongodb");
// const uri = process.env.CONNECTION_STRING;

// const client = new MongoClient(uri);

// async function run() {
//   console.log("run called");

//   try {
//     const database = client.db("sample_mflix");
//     const movies = database.collection("movies");

//     const query = { title: "Back to the Future" };
//     console.log("before await");
//     const movie = await movies.findOne(query);
//     console.log("after await");

//     console.log("movie", movie);
//   } finally {
//     console.log("finally");
//     await client.close();
//   }
// }
// run().catch(console.dir);
