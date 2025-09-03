const bodyParser = require("body-parser");
const express=require("express");

var app= express();

app.set("view engine","ejs");
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

var items=[];
var emp="working";

app.get("/",function(req,res){
    res.render("list",{ejes:items})
});

app.post("/",function(req,res){
    var item =req.body.ele1;
    items.push(item);
    res.redirect("/");
});



app.listen(3000,function(){console.log("server started")})