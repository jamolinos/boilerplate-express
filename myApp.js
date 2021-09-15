var express = require('express');
var app = express();

console.log("Hello World");

app.use("/public", express.static(__dirname + "/public"));

app.use(function (req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip)
  next()
})

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html")
})

app.get("/json", function(req, res) {
  var text = "Hello json";
  var response = "";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    response = text.toUpperCase();
  } else {
    response = text;
  }
  res.json({"message": response});
})

module.exports = app;
