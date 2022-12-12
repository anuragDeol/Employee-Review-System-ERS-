const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const passport = require("passport");
const passportLocal = require("./config/passport-local");
const MongoStore = require("connect-mongo");
const { default: mongoose } = require("mongoose");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Success! MongodbAtlas DB Connected");
  });


app.use(expressLayouts);

// using ejs as view engine - frontend
app.set("view engine", "ejs");
app.set("views", "./views");

// bodyparse - to parse req.body
app.use(express.urlencoded({ extended: false }));

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// mongo store is used to store the session cookie in the db
app.use(
  session({
    name: "employeeReview",
    secret: "MicroTask",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: process.env.DATABASE,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "Success! connect-mongodb setup");
      }
    ),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


// routes
app.use("/", require("./routes/index"));

// start server
app.listen(port, function (err) {
  if (err) {
    console.log("Error while connecting to server");
    return;
  }
  console.log(`Server running on port ${port}.`);
});

