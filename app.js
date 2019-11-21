var express = require("express"),
              app = express(),
              bodyParser = require("body-parser"),
              mongoose = require("mongoose"),
              Drill = require("./models/drill"),
              User = require("./models/user");

mongoose.set('useNewUrlParser',true);
mongoose.connect("mongodb://localhost/bowling-drill", { useUnifiedTopology: true });

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// var bob = new User({
//     firstname: "Billy Bob",
// 	lastname: "Thornton",
//     email: "bbthorn@gmail.com"
//     drill:
// })

// bob.save(function(err, user){
//     if(err){
//         console.log("Something went wrong: " + err);
//     } else {
//         console.log(user);
//     }
// })

// ROUTES
app.get("/", function(req, res){
    res.render("index");
});

// INDEX
app.get("/drillings", function(req, res){
    User.find({}, function(err, allUsers){
        if(err){
            console.log(err);
        } else {
            res.render("drillings/index", {users: allUsers});
        }
    })
});

// NEW
app.get("/drillings/new", function(req, res){
    res.render("drillings/new");
});

// CREATE
app.post("/drillings", function(req, res){
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var newUser = {firstname: firstname, lastname: lastname, email: email};
    User.create(newUser, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            console.log("New user: ");
            console.log(newlyCreated);
            res.redirect("/drillings");
        }
    })
});


// SHOW
// app.get("/drillings/:id", function()){

// }

// EDIT
// app.get("/drillings/:id/edt")

// UPDATE
// app.put("/drillings/:id")

// DELETE
// app.delete("/drillings/:id")

app.listen(8080, process.env.IP, function(){
    console.log("Server is running");
})