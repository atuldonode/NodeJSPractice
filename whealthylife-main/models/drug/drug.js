const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const Drug = new Schema({
    drugName: String,
    alternateName: String,
    type: String,
    subType: String,
    manufacturedBy: String,
    doctor_Id: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    license: String,
    composition: String,
    marketedBy: String,
    medicineTag: String,
    prescription: String,
    instruction: String,
    strength: String,
    status: {
        type: String,
        default: "active",
    },
}, {
    timestamps: true,
});
module.exports = mongoose.model("Drug", Drug);