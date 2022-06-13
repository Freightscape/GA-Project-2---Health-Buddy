///////////////////////////////
// Importing the Dependencies
///////////////////////////////

const express = require("express");
const User = require("../models/user");
const bcrypt = require("brcryptjs");

///////////////////////////////
// Making the Create Route
///////////////////////////////

const router = express.Router();

///////////////////////////////
// The Routes
///////////////////////////////

// For signing up (Get => the form, post => submitting the form)
router.get("/signup", (req, res) => {
  res.render("user/signup");
});

router.post("/signup", async (req, res) => {
  req.body.password = await bcrypt.hash(
    req.body.password,
    await bcrypt.genSalt(10) // adding 10 random cahrecters
  );
  // Creating User
  User.create(req.body)
    .then((user) => {
      res.redirect("/user/login");
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// Login Routes get => form, post => submit form
router.get("/login", (req, res) => {
  res.render("user/login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then(async (user) => {
      if (user) {
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          req.session.username = username;
          req.session.loggedIn = true;
          res.redirect("/consumeds");
        } else {
          res.json({ error: "Invalid Password, Please try again." });
        }
      } else {
        res.json({ error: "This User does not exist" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
});

module.exports = router;
