const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fname:String,
    lname:String,
    email:{
        type: String,
        unique: true
    },
    orderId:{
        type: mongoose.Types.ObjectId,
        ref: "Order",
    },
});

const User = new mongoose.model("User", userSchema);
module.exports = User;