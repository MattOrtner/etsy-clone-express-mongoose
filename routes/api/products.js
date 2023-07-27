const express = require("express");
const router = express.Router();

const { Product } = require("../../models/product-model");

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
router.post("/", (req, res) => {
  const product = new Product({
    product_name: req.body.product_name,
    price: req.body.price,
    description: req.body.description,
    quantity: req.body.quantity,
    dimensions: req.body.dimensions,
    renewal_option: req.body.renewal_option,
    product_type: req.body.product_type,
    about_details: req.body.about_details,
    images: req.body.images,
    seller_id: req.body.seller_id,
  });
  product
    .save()
    .then((savedProduct) => res.send(savedProduct))
    .catch((err) => {
      res.status(400).json({ error: "Unable to add this product" });
    });
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
