var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    date: {type: Date, default: Date.now()},
    right: {
        grip: Number,
        holesize: Number,
        pitchfr: Number,
        pitchlr: Number,
        oval: Number,
        mach: Number
    },
    left: {
        grip: Number,
        holesize: Number,
        pitchfr: Number,
        pitchlr: Number,
        oval: Number,
        mach: Number
    },
    thumb: {
        slug: Number,
        grip: Number,
        holesize: Number,
        pitchfr: Number,
        pitchlr: Number,
        oval: Number,
        mach: Number
    }
});

module.exports = mongoose.model("User", userSchema);