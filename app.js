require("dotenv").config();
const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const app = express();

const port = 3000 || process.env.PORT;
const connectDB = require("./server/config/db");
//session
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
// import { injectSpeedInsights } from "@vercel/speed-insights";

// injectSpeedInsights();

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);
//flash message

app.use(flash({ sessionKeyName: "flash message" }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

//static files      html css js
app.use(express.static("public"));

//templating engine
app.use(expressEjsLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

const whitelist = ["*"];

app.use((req, res, next) => {
  const origin = req.get("referer");
  const isWhitelisted = whitelist.find((w) => origin && origin.includes(w));
  if (isWhitelisted) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,Content-Type,Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
  }
  // Pass to next layer of middleware
  if (req.method === "OPTIONS") res.sendStatus(200);
  else next();
});

const setContext = (req, res, next) => {
  if (!req.context) req.context = {};
  next();
};
app.use(setContext);

//home route path
app.use("/", require("./server/routes/customerRoutes"));

app.get("*", (req, res) => {
  res.render("404");
});

//connect DB
connectDB();

app.listen(port, () => {
  console.log(`App connect with port ${port}`);
});
