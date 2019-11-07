var express = require("express"),
              app = express(),
              bodyParser = require("body-parser"),
              mongoose = require("mongoose");

mongoose.set('useNewUrlParser',true);
mongoose.connect("mongodb://localhost/bowling-drill");

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

var userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    date: {type: Date, default: Date.now()}
})

var User = mongoose.model("User", userSchema);

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

// BELOW ROUTES NOT YET IMPLEMENTED
// NEW
app.get("/drillings/new", function(req, res){
    res.render("new");
})

// CREATE
// app.post()

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