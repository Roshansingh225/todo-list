const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

let todos = [];

app.get("/", function (req, res) {
  res.render("list", { ros: todos });
});

app.post("/", function (req, res) {
  const newItem = req.body.newItem;
  if (newItem && newItem.trim() !== "") {
    todos.push({
      _id: Date.now().toString(),
      name: newItem
    });
  }
  res.redirect("/");
});

app.put("/:id", function (req, res) {
  const id = req.params.id;
  const newName = req.body.name;
  todos = todos.map((item) => {
    if (item._id === id) {
      return { _id: id, name: newName };
    }
    return item;
  });
  res.redirect("/");
});

app.delete("/:id", function (req, res) {
  const id = req.params.id;
  todos = todos.filter((item) => item._id !== id);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
