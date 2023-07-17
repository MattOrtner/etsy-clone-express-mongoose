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
// @description Create user
router.post("/sign-up", (req, res) => {
  // check if email exists!!!!!!
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isSignedIn: false,
    favoriteProducts: [],
    shoppingCart: [],
    store: {
      storeName: "",
      products: [],
    },
  });
  user
    .save()
    .then((savedUser) => res.send(savedUser))
    .catch((err) => {
      res.status(400).json({ error: "Unable to add account" });
    });
});

// @route POST api/users
// @description Sign-In user
router.post("/sign-in", (req, res) => {
  User.findOneAndUpdate(
    { email: req.body.email },
    { isSignedIn: true },
    {
      returnDocument: "after",
    }
  )
    .then((user) => {
      res.send({
        name: user.name,
        email: user.email,
        isSignedIn: user.isSignedIn,
        favoriteProducts: user.favoriteProducts,
        shoppingCart: user.shoppingCart,
        store: {
          storeName: user.store.storeName,
          products: user.store.products,
        },
      });
    })
    .catch((err) => {
      console.error("err", err);
      console.error("err.config.data", err.config.data);
      res.status(400).json({ error: "Unable to login" });
    });
});

// @route PUT api/users
// @description Sign-Out user
router.put("/sign-out", (req, res) => {
  User.findOneAndUpdate(req.body.email, { isSignedIn: false })
    .then((user) =>
      res.json({
        msg: "Logged out successful",
      })
    )
    .catch((err) => {
      console.error(err);
      res.status(400).json({ error: "Unable to logout" });
    });
});

// @route PUT api/users/:id
// @description Update user
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
