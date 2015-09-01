var express = require("express");

var bodyParser = require("body-parser");

var app = express();

app.set("view engine", "ejs");

var array = [], id=1, currentID, currentItem;

function todoItem(name, id, link, memo){
  this.name = name;
  this.id = id;
  this.link = link;
  this.memo = memo;
}

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/public/"));

app.get("/todo", function(req, res){
  res.render("index", {arr: array});
});

app.get("/todo/new", function(req, res){
  res.render("new");
});

app.post("/submit", function(req, res){
  currentItem =  new todoItem(req.body.item, id, "http://localhost:3000/todo/"+id, "");
  array.push(currentItem);
  id++;
  res.render("index", {arr: array} );
});

app.get("/todo/:id", function(req, res){
  res.render("individual", {name: array[req.params.id-1].name, id: id-1, memo:array[req.params.id-1].memo});
  currentID = req.params.id;
});

app.post("/add-memo", function(req, res){
  array[currentID-1].memo = req.body.memo;
  res.render("individual", {name: array[currentID-1].name, id: currentID-1, memo:array[currentID-1].memo});
});

app.post("/delete-item", function(req, res){
  array[currentID-1] = "";
  res.render("index", {arr: array});
});

app.listen(3000, function(){});

