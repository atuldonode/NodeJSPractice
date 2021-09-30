const mongoose = require("mongoose");

const menSchema = new mongoose.Schema({
    name:String,
    mobile:Number,  
});

const Mens = mongoose.model(Mens, "menSchema")
module.exports();