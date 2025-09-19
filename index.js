const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

let todos = []; 


app.get("/", (req, res) => {
  res.render("list", { ros: todos });
});

app.post("/", (req, res) => {const newItem = req.body.newItem?.trim();
  if (newItem) {
    todos.push({ _id: Date.now().toString(), name: newItem });
  }
       res.redirect("/");});

app.put("/:id", (req, res) => {const { id } = req.params;
  const name = req.body.name?.trim();
  todos = todos.map(item => item._id === id ? { ...item, name: name || item.name } : item);
    res.redirect("/");});



app.delete("/:id", (req, res) => {const id = req.params.id;
  todos = todos.filter(item => item._id !== id);
  res.redirect("/");});


app.listen(3000, function(){
  console.log("Server started");});
