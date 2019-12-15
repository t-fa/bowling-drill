var express = require("express"),
              app = express(),
              bodyParser = require("body-parser"),
              mongoose = require("mongoose"),
              methodOverride = require("method-override"),
            //   Drill = require("./models/drill"),
              User = require("./models/user");

mongoose.set('useNewUrlParser',true);
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/bowling-drill", { useUnifiedTopology: true });

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

/*
TO DO:
-User log ins
-Separate drill model from user model
-Make form a better use experience - probably 1 finger per page
-Edit and delete
-UI improvements
-Sanitize user input
-Route error handling
*/

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
    // left finger
    var lgrip = req.body.lgrip;
    var lhol = req.body.lhol;
    var lpitchfr = req.body.lpitchfr;
    var lpitchlr = req.body.lpitchlr;
    var loval = req.body.loval;
    var lmach = req.body.lmach;
    // right finger
    var rgrip = req.body.rgrip;
    var rhol = req.body.rhol;
    var rpitchfr = req.body.rpitchfr;
    var rpitchlr = req.body.rpitchlr;
    var roval = req.body.roval;
    var rmach = req.body.rmach;
    // thumb
    var tslug = req.body.tslug;
    var tgrip = req.body.tgrip;
    var thol = req.body.thol;
    var tpitchfr = req.body.tpitchfr;
    var tpitchlr = req.body.tpitchlr;
    var toval = req.body.toval;
    var tmach = req.body.tmach;

    var newUser = {firstname: firstname,
        lastname: lastname, 
        email: email,
        left: {
            grip: lgrip,
            holesize: lhol,
            pitchfr: lpitchfr,
            pitchlr: lpitchlr,
            oval: loval,
            mach: lmach
        },
        right: {
            grip: rgrip,
            holesize: rhol,
            pitchfr: rpitchfr,
            pitchlr: rpitchlr,
            oval: roval,
            mach: rmach
        },
        thumb: {
            slug: tslug,
            grip: tgrip,
            holesize: thol,
            pitchfr: tpitchfr,
            pitchlr: tpitchlr,
            oval: toval,
            mach: tmach
        }
    };
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
app.get("/drillings/:id", function(req, res){
    var id = req.params.id;
    User.findById(id, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            res.render("drillings/show", {user: foundUser});
        }
    });
});

// EDIT
app.get("/drillings/:id/edit", function(req, res){
    var id = req.params.id;
    User.findById(id, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            res.render("drillings/edit", {user: foundUser});
        }
    });
});

// UPDATE
app.put("/drillings/:id", function(req, res){
    // left finger
    var lgrip = req.body.lgrip;
    var lhol = req.body.lhol;
    var lpitchfr = req.body.lpitchfr;
    var lpitchlr = req.body.lpitchlr;
    var loval = req.body.loval;
    var lmach = req.body.lmach;
    // right finger
    var rgrip = req.body.rgrip;
    var rhol = req.body.rhol;
    var rpitchfr = req.body.rpitchfr;
    var rpitchlr = req.body.rpitchlr;
    var roval = req.body.roval;
    var rmach = req.body.rmach;
    // thumb
    var tslug = req.body.tslug;
    var tgrip = req.body.tgrip;
    var thol = req.body.thol;
    var tpitchfr = req.body.tpitchfr;
    var tpitchlr = req.body.tpitchlr;
    var toval = req.body.toval;
    var tmach = req.body.tmach;
    var fingerSizes = {
        left: {
            grip: lgrip,
            holesize: lhol,
            pitchfr: lpitchfr,
            pitchlr: lpitchlr,
            oval: loval,
            mach: lmach
        },
        right: {
            grip: rgrip,
            holesize: rhol,
            pitchfr: rpitchfr,
            pitchlr: rpitchlr,
            oval: roval,
            mach: rmach
        },
        thumb: {
            slug: tslug,
            grip: tgrip,
            holesize: thol,
            pitchfr: tpitchfr,
            pitchlr: tpitchlr,
            oval: toval,
            mach: tmach
        }
    }
	User.findByIdAndUpdate(req.params.id, fingerSizes, function(err){
		if(err) {
			console.log(err);
			res.redirect("/drillings");
		} else {
			res.redirect("/drillings/" + req.params.id);
		}
	});
})

// DELETE
// app.delete("/drillings/:id")

app.listen(8080, process.env.IP, function(){
    console.log("Server is running");
})