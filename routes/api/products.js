// routes/api/products.js

const express = require("express");
const router = express.Router();

// Load Product model
const Product = require("../../models/product-model");

// @route GET api/products
// @description Get all products
// @access Public
router.get("/", (req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) =>
      res.status(404).json({ noproductsfound: "No Products found" })
    );
});

// @route GET api/products/:id
// @description Get single product by id
// @access Public
router.get("/:id", (req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) =>
      res.status(404).json({ noproductfound: "No Product found" })
    );
});

// @route GET api/products
// @description add/save product
// @access Public
router.post("/", (req, res) => {
  const product = new Product({
    product_name: req.body.product_name,
    price: req.body.price,
    description: req.body.description,
    is_in_stock: req.body.is_in_stock,
    is_in_other_carts: req.body.is_in_other_carts,
    highlights: req.body.highlights,
    dimensions: req.body.dimensions,
    labels: req.body.labels,
  });
  product
    .save()
    .then((savedProduct) => res.send(savedProduct))
    .catch((err) => {
      res.status(400).json({ error: "Unable to add this product" });
    });
});

// @route GET api/products/:id
// @description Update product
// @access Public
router.put("/:id", (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body)
    .then((product) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route GET api/products/:id
// @description Delete product by id
// @access Public

router.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id, req.body)
    .then((product) => res.json({ mgs: "Product entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a product" }));
});

module.exports = router;
