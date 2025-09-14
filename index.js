import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); 
app.use(express.static("public")); 

let ejes = []; 


app.get("/", (req, res) => {
  res.render("list", { ejes: ejes });
});


app.post("/", (req, res) => {
  const item = req.body.ele1;
  if (item && item.trim()) {
    ejes.push(item.trim());
  }
  res.redirect("/");
});


app.post("/delete", (req, res) => {
  const idx = parseInt(req.body.index, 10);
  if (!isNaN(idx) && idx >= 0 && idx < ejes.length) {
    ejes.splice(idx, 1);
  }
  res.redirect("/");
});


app.post("/edit", (req, res) => {
  const idx = parseInt(req.body.index, 10);
  const newValue = req.body.newValue;
  if (!isNaN(idx) && newValue && newValue.trim()) {
    ejes[idx] = newValue.trim();
  }
  res.redirect("/");
});

app.listen(3000,function(){
    console.log("server started")
})
