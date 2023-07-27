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
  dimensions: {
    type: [{ length: String, width: String, height: String }],
    required: true,
  },
  seller_id: {
    type: String,
    required: true,
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
  about_details: { who: String, what: String, when: String },
  labels: [String],
  highlights: [String],
});

const Product = mongoose.model("product", ProductSchema);

module.exports = { Product, ProductSchema };
