var express = require("express"),
              app = express(),
              bodyParser = require("body-parser"),
              mongoose = require("mongoose");
              User = require("./models/user")

mongoose.set('useNewUrlParser',true);
mongoose.connect("mongodb://localhost/bowling-drill");

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// var drillSchema = new mongoose.Schema({
//     left
// })

// ROUTES
app.get("/", function(req, res){
    res.render("index");
})

// INDEX
app.get("/drillings", function(req, res){
    res.render("drillings");
})

// NEW
app.get("/drillings/new", function(req, res){
    res.render("new");
})

// CREATE
// app.post("/drillings/", function(req, res){

// })

// SHOW
// app.get("/drillings/:id")

// EDIT
// app.get("/drillings/:id/edt")

// UPDATE
// app.put("/drillings/:id")

// DELETE
// app.delete("/drillings/:id")

app.listen(8080, process.env.IP, function(){
    console.log("Server is running");
})