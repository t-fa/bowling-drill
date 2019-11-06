var express = require("express"),
              app = express(),
              mongoose = require("mongoose");

mongoose.set('useNewUrlParser',true);
// mongoose.connect("mongodb://localhost/bowling-drill");

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.redirect("index");
})

app.listen(3000, process.env.IP, function(){
    console.log("Server is running");
})