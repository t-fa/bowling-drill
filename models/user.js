var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    date: {type: Date, default: Date.now()},
    drill: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Drill"
        }
    ]
});

module.exports = mongoose.model("User", userSchema);