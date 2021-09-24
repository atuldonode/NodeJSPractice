const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const Topics = new Schema({
    title: String,
    status: {
        type: String,
        default: "active",
    },
}, {
    timestamps: true,
});
module.exports = mongoose.model("Topics", Topics);