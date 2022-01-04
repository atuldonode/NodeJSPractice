const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const Procedure = new Schema({
    procedureName: String,
    notes: String,
    cost: String,
    tax: String,
    totalCost: String,
    doctorId: {
        type : mongoose.Types.ObjectId,
        ref : "User"
    },
    status: {
        type: String,
        default: "active",
    },
}, {
    timestamps: true,
});
module.exports = mongoose.model("Procedure", Procedure);