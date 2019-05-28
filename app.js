const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const {
  globalRoutes
} = require("./app/route/globalrouter");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./app/config/keys.config").mongoURI;

// Connect to MongoDB
mongoose.connect(
    db,
    { useNewUrlParser: true }
).then(
    () => console.log("MongoDB up and running ...")
).catch(
    err => console.log(err)
);

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./app/config/passport.config")(passport);

// Routes
app.use("/api", globalRoutes);

const port = process.env.PORT || 1000; 

app.listen(port, () => console.log(`Server up and running [${port}] ...`));