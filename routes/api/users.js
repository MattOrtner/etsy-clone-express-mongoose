const express = require("express");
const router = express.Router();

const User = require("../../models/user-model");

// @route GET api/users/:id
// @description Get single product by id
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json({ noproductfound: "No User found" }));
});

// @route POST api/users
// @description add/save user
router.post("/sign-up", (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    is_signed_in: true,
    favorite_products: [],
    shopping_cart: [],
    store: {
      store_name: "",
      products: [],
    },
  });
  user
    .save()
    .then((savedUser) => res.send(savedUser))
    .catch((err) => {
      res.status(400).json({ error: "Unable to add this product" });
    });
});

// @route PUT api/products/:id
// @description Update product
router.put("/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
  })
    .then((user) =>
      res.json({
        msg: "Updated successfully",
        user,
      })
    )
    .catch((err) => {
      console.error(err);
      res.status(400).json({ error: "Unable to update the Database" });
    });
});

// @route DELETE api/users/:id
// @description Delete user by id
router.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id, req.body)
    .then((user) => res.json({ mgs: "User entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a product" }));
});

module.exports = router;
