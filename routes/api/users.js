const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

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
router.post("/sign-up", async (req, res) => {
  const isUser = await User.findOne({ email: req.body.email });
  try {
    if (isUser) {
      res.json({ body: "email exists" });
    } else {
      bcrypt.hash(req.body.password, 10, function (err, hash) {
        const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          isSignedIn: true,
          favoriteProducts: [],
          shoppingCart: [],
          store: {
            storeName: "",
            products: [],
          },
        });
        user
          .save()
          .then((savedUser) =>
            res.send({
              name: savedUser.name,
              email: savedUser.email,
              isSignedIn: savedUser.isSignedIn,
              favoriteProducts: savedUser.favoriteProducts,
              shoppingCart: savedUser.shoppingCart,
              store: {
                storeName: "",
                products: savedUser.store.products,
              },
            })
          )
          .catch((err) => {
            res.status(400).json({
              error: "Unable to add account, please try again shortly.",
            });
            console.error("error", err);
          });
      });
    }
  } catch (error) {
    res.status(500).send();
  }
});

// @route POST api/users
// @description Sign-In user
router.post("/sign-in", async (req, res) => {
  const isUser = await User.findOne({ email: req.body.email });
  try {
    if (isUser) {
      bcrypt.compare(
        req.body.password,
        isUser.password,
        function (err, result) {
          if (result) {
            res.send({
              name: isUser.name,
              email: isUser.email,
              isSignedIn: isUser.isSignedIn,
              favoriteProducts: isUser.favoriteProducts,
              shoppingCart: isUser.shoppingCart,
              store: {
                storeName: isUser.store.storeName,
                products: isUser.store.products,
              },
            });
          } else {
            res.json({ body: "user does not exist" });
          }
        }
      );
    }
  } catch (error) {
    console.error("err", err);
    console.error("err.config.data", err.config.data);
    res.status(400).json({ error: "Unable to login" });
  }
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
