///////////////////////////////
// Setting Up my Dependencies
///////////////////////////////
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const path = require("path");
const ConsumedRouter = require("./controllers/consumeds");
const UserRouter = require("./controllers/users");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { Store } = require("express-session");

///////////////////////////////
// Creating Express Application Object Bind Liquid Template Engine
///////////////////////////////

const app = require("liquid-express-views")(express(), {
  root: [path.resolve(__dirname, "views/")],
});

///////////////////////////////
// Setting up Middleware
///////////////////////////////

app.use(morgan("tiny"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
    saveUninitialized: true,
    resave: false,
  })
);

///////////////////////////////
// Setting up Routes
///////////////////////////////

app.use("/consumeds", ConsumedRouter);
app.use("/user", UserRouter);

app.get("/", (req, res) => {
  res.render("index");
});

///////////////////////////////
// Server Listener
///////////////////////////////

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
