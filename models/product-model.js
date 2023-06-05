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
    type: [{ length: String, width: String, height: String }],
    required: true,
  },
  labels: {
    type: [String],
  },
  store_id: {
    type: String,
    required: String,
  },
  images: {
    type: [String],
    required: true,
  },
  renewal_option: {
    type: String,
    required: true,
  },
  product_type: {
    type: String,
    required: true,
  },
  about_details: [{ who: String, what: String, when: String }],
});

module.exports = Product = mongoose.model("product", ProductSchema);
