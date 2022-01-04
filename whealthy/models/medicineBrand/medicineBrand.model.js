const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const medicineBrand = new Schema({
    brand: String,
    status: {
        type: String,
        default: "active",
    },
}, {
    timestamps: true,
});
module.exports = mongoose.model("medicineBrand", medicineBrand);