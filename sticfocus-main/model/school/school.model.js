
const mongoose = require("mongoose"),
    Schema = mongoose.Schema


const School= new Schema({
    name: String,
    location: {
        address: String,
        landmark: String,
        state: String,
        city: String,
        pincode: Number,
        country: String,
        lat: {
            type: String,
        },
        lng: {
            type: String,
        },
    },
    board: String,
    description: String,
    status: {
        type: String,
        default: "active",
    },
}, {
    timestamps: true,
});



module.exports = mongoose.model("School", School);