var bodyParser = require("body-parser");
var express = require("express");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/public", express.static(__dirname + "/public"));

app.use(function(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function(req, res) {
  var text = "Hello json";
  var response = "";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    response = text.toUpperCase();
  } else {
    response = text;
  }
  res.json({ message: response });
});

app.get(
  "/now",
  function(req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function(req, res) {
    res.json({ time: req.time });
  }
);

app.get("/:word/echo", function(req, res){
  res.json({echo: req.params.word});
});

app.route("/name")
.get(function(req, res){
  var { first: firstName, last: lastName } = req.query;
  res.json({
    name: `${firstName} ${lastName}`
  })
})
.post(function(req, res){
  var { first: firstName, last: lastName } = req.body;
  res.json({
    name: `${firstName} ${lastName}`
  })
})

module.exports = app;
