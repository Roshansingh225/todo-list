const express = require("express");
const app= express();

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"));

let tasks = [];
let editIndex = null;

app.get("/", (req,res)=>{res.render("list",{ejes:tasks,editIndex})})

app.post("/",(req,res)=>{
 if(req.body.ele1)  tasks.push(req.body.ele1)
res.redirect("/")
})

app.post("/delete",(req,res)=>{
 let i= parseInt(req.body.index);
 tasks.splice(i,1)
   res.redirect("/")})

app.get("/edit/:id",(req,res)=>{
 editIndex=parseInt(req.params.id)
res.redirect("/")})

app.post("/edit",(req,res)=>{
 let i= parseInt(req.body.index)
 tasks[i] = req.body.newValue
 editIndex=null
res.redirect("/")
})

app.listen(3000,function(){
  console.log("server started")
})
