const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    firstName:{
        type: String
    },
    LastName:{
        type: String
    },
    city:{
        type: String
    },
    dist:{
        type: String
    },
    state:{
        type: String
    }
})

const address = new mongoose.model("address", addressSchema);
module.exports = address;