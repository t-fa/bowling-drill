var express = require("express"),
              app = express(),
              mongoose = require("mongoose");

mongoose.set('useNewUrlParser',true);
// mongoose.connect("mongodb://localhost/bowling-drill");

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("index");
})

app.listen(8080, process.env.IP, function(){
    console.log("Server is running");
})