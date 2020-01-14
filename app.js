const express = require("express"),
              app = express(),
              bodyParser = require("body-parser"),
              LocalStrategy = require("passport-local"),
              mongoose = require("mongoose"),
              methodOverride = require("method-override"),
              passport = require("passport"),
              passportLocalMongoose = require("passport-local-mongoose"),
            //   Drill = require("./models/drill"),
              User = require("./models/user");

// mongoose
mongoose.set('useNewUrlParser',true);
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/bowling-drill", { useUnifiedTopology: true });

app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
	secret: "We need a better secret",
	resave: false,
	saveUninitialized: false
}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

/*
TO DO:
-User log ins
-Separate drill model from user model
-Make form a better use experience - probably 1 finger per page
-UI improvements
-Sanitize user input
-Input validation
-Search for a user
-Separate out session password/make a better password
*/


// AUTHENTICATION ROUTES

// REGISTER
app.get("/register", (req, res) => res.render("register"));

app.post("/register", function(req, res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		} else {
			passport.authenticate("local")(req, res, function(){
				res.redirect("/secret");
			});
		}
	});
});

// LOG IN
app.get("/login", (req,res) => res.render("login"));

app.post("/login", passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
}), function(req, res){
});

// LOG OUT
app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

// ROUTES
app.get("/", (req, res) => res.render("index"));

// INDEX
app.get("/drillings", isLoggedIn, function(req, res){
    User.find({}, function(err, allUsers){
        if(err){
            console.log(err);
        } else {
            res.render("drillings/index", {users: allUsers});
        }
    })
});

// NEW
app.get("/drillings/new", isLoggedIn, (req, res) => res.render("drillings/new"));

// CREATE
app.post("/drillings", isLoggedIn, function(req, res){
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
app.get("/drillings/:id", isLoggedIn, function(req, res){
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
app.get("/drillings/:id/edit", isLoggedIn, function(req, res){
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
app.put("/drillings/:id", isLoggedIn, function(req, res){
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
app.delete("/drillings/:id", isLoggedIn, function(req, res){
    User.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
			res.redirect("/drillings");
		} else {
			res.redirect("/drillings");
		}
	});
})

app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(req,res){
  res.status(500);
  res.render('500');
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

app.listen(8080, process.env.IP, () => console.log("Server is running"));