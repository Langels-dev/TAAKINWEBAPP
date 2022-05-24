const express = require("express");
const hbs = require("hbs");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("./routes/index"));
app.use(express.static("public"));

//HandleBars
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/components");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/products", (req, res) => {
  res.render("products");
});

app.get("/services", (req, res) => {
  res.render("services");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.listen(port, () => {
  console.log("Server on port 3500");
});
