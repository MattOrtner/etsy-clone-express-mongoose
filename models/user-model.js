const mongoose = require("mongoose");
const { ProductSchema } = require("./product-model");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: [true, "Please add a Password"],
    minlength: [3, "Password should have at least six(6) characters"],
  },
  isSignedIn: Boolean,
  favoriteProducts: {
    type: [String],
  },
  shoppingCart: {
    type: [String],
  },
  store: {
    type: {
      store_name: String,
      products: [ProductSchema],
    },
  },
});

module.exports = User = mongoose.model("user", UserSchema);
