const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    min: 1,
    required: true,
  },
  is_in_other_carts: {
    type: Boolean,
  },
  highlights: {
    type: [String],
  },
  dimensions: {
    type: [String],
    required: true,
  },
  labels: {
    type: [String],
  },
});

module.exports = Product = mongoose.model("product", ProductSchema);
