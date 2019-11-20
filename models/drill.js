var mongoose = require("mongoose");

var drillSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Drill", drillSchema);