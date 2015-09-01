var express = require("express"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    app = express(),
    morgan = require("morgan")
    Todo = require("./todo");

app.set("view engine", "ejs");
app.use(morgan('tiny'));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public/"));

var array = [], id=1;

app.get('/', function(req,res){
  res.redirect("/todos")
});

app.get("/todos", function(req, res){
  res.render("index", {arr: array});
});

app.get("/todos/new", function(req, res){
  res.render("new");
});

app.post("/todos", function(req, res){
  array.push(new Todo(req.body.item, id));
  id++;
  res.redirect("/todos");
});

app.get("/todos/:id", function(req, res){
  var id = Number(req.params.id);
  array.forEach(function(todo){
    if(todo.id === id){
      res.render("show", {todo:todo});
    }
  })
});

app.put("/todos/:id", function(req, res){
  var id = Number(req.params.id);
  array.forEach(function(todo){
    if(todo.id === id){
      todo.name = req.body.todo.name;
      res.redirect("/todos")
    }
  })
});

app.delete("/todos/:id", function(req, res){
  var id = Number(req.params.id);
  array.forEach(function(todo){
    if(todo.id === id){
      array.splice(array.indexOf(todo),1)
      res.redirect("/todos")
    }
  })
});

app.listen(3000, function(){
  console.log("server starting on port 3000")
});

