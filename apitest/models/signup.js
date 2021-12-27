const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
        data:[{
        fname: String,
        lname: String,
        phone: String
        }],
});

const Signup = new mongoose.model("Signup", signupSchema);
module.exports = Signup;