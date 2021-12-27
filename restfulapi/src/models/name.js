const mongoose = require("mongoose");

const nameSchema = new mongoose.Schema({
    fname:{
        type:String
    },
    lname:{
        type:String
    }
})

const Name = new mongoose.model("Name", nameSchema);
module.exports= Name;