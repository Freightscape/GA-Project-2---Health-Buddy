/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const express = require("express");
const { route } = require("express/lib/application");
const { find } = require("../models/consumed");
const Consumed = require("../models/consumed");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

// index route
// async: dont run, i have to wait for find finish, before i run
//   router.get("/", async (req, res) => {
//     const fruits = await Fruit.find();
//     res.render("fruits/index.liquid", {
//       fruits,
//     });
//   });
// index route
router.get("/", (req, res) => {
  // find all the fruits
  Consumed.find({ username: req.session.username })
    // render a template after they are found
    .then((consumeds) => {
      console.log(consumeds);
      res.render("consumeds/index.liquid", { consumeds });
    })
    // send error as json if they aren't
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// create route
router.post("/", (req, res) => {
  // check if the readyToEat property should be true or false
  req.body.satiating = req.body.satiating === "on" ? true : false;
  // add user to req.body to track related user
  req.body.username = req.session.username;
  // create the new fruit
  Consumed.create(req.body)
    .then((consumeds) => {
      // redirect user to index page if successfully created item
      res.redirect("/consumeds");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// new route
router.get("/new", (req, res) => {
  res.render("consumeds/new.liquid");
});

// show route
router.get("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;

  // find the particular fruit from the database
  Consumed.findById(id)
    .then((consumed) => {
      // render the template with the data from the database
      res.render("consumeds/show.liquid", { consumed });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// edit route
router.get("/:id/edit", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // get the fruit from the database
  Consumed.findById(id)
    .then((consumed) => {
      // render edit page and send fruit data
      res.render("consumeds/edit.liquid", { consumed });
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

//update route
router.put("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // check if the readyToEat property should be true or false
  req.body.satiating = req.body.satiating === "on" ? true : false;
  // update the fruit
  Consumed.findByIdAndUpdate(id, req.body, { new: true })
    .then((consumed) => {
      // redirect to main page after updating
      res.redirect("/consumeds");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

router.delete("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // delete the fruit
  Consumed.findByIdAndRemove(id)
    .then((consumed) => {
      // redirect to main page after deleting
      res.redirect("/consumeds");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
