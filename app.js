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

User.create(
	{
		firstname: "Billy Bob,",
		lastname: "Thornton",
		email: "bbthorn@gmail.com"
	}, function(err, user){
		if(err){
			console.log(err);
		} else {
			console.log("Newly created user: ");
			console.log(campground);
		}
});

// ROUTES
app.get("/", function(req, res){
    res.render("index");
});

// INDEX
app.get("/drillings", function(req, res){
    res.render("drillings");
});

// NEW
app.get("/drillings/new", function(req, res){
    res.render("new");
});

// CREATE
app.post("/drillings/", function(req, res){
    var first = req.sanitize(req.body.firstname);
    var last = req.sanitize(req.body.lastname);
    var email = req.sanitize(req.body.email);
    var newUser = {firstname: firstname, lastname: lastname, email: email};
    User.create(newUser, function(err, newlyCreated){
        if(err){
            console.log(err);
            
        } else {
            console.log("New user: " + newlyCreated);
            res.redirect("/drillings");
        }
    })
)};


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