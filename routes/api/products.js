const express = require("express");
const router = express.Router();

const { Product } = require("../../models/product-model");
const User = require("../../models/user-model");

// @route GET api/products
// @description Get all products
router.get("/", (req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) =>
      res.status(404).json({ noproductsfound: "No Products found" })
    );
});

// @route GET api/products/:id
// @description Get single product by id
router.get("/:id", (req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) =>
      res.status(404).json({ noproductfound: "No Product found" })
    );
});

// @route POST api/products
// @description add/save product
router.post("/", async (req, res) => {
  try {
    const {
      product_name,
      price,
      description,
      quantity,
      dimensions,
      renewal_option,
      product_type,
      about_details,
      images,
      seller_id,
    } = req.body;

    // Create the new product
    const newProduct = await Product.create({
      product_name,
      price,
      description,
      quantity,
      dimensions,
      renewal_option,
      product_type,
      about_details,
      images,
      seller_id,
    });

    // Find the user by ID
    const user = await User.findById(seller_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's inventory by pushing the new product ID
    user.inventory.push(newProduct._id);

    // Save the updated user
    await user.save();

    // Return the new product to the client
    return res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
});

// @route PUT api/products/:id
// @description Update product
router.put("/:id", (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
  })
    .then((product) =>
      res.json({
        msg: "Updated successfully",
        product,
      })
    )
    .catch((err) => {
      console.error(err);
      res.status(400).json({ error: "Unable to update the Database" });
    });
});

// @route DELETE api/products/:id
// @description Delete product by id
router.delete("/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id, req.body)
    .then((product) => res.json({ mgs: "Product entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a product" }));
});

module.exports = router;
