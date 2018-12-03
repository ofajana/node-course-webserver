const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

let app = express();

app.set("view engine", "hbs");

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `\n${now} : ${req.method} ${req.url}`;

  fs.appendFile("server.log", log, err => {
    if (err) console.log("Unable to log to file");
  });
  console.log(log);
  next();
});

app.use((req, res, next) => {
  res.render("maintenance.hbs");
  //next();
});
app.use(express.static(__dirname + "/public"));

hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("getCurrentYear", new Date().getFullYear());
app.get("/", (req, res) => {
  res.render("home.hbs", {
    welcomeMessage: "Welcome to my first Express Webapp",
    pageTitle: "Webapp Index Page"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About the Node WebApp"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Cant wek"
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
