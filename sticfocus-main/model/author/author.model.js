const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const Author = new Schema({
    fileURL: String,
    title: String,
    hashtags: String,
    description: String,
    status: {
        type: String,
        default: "active",
    },
}, {
    timestamps: true,
});



module.exports = mongoose.model("Author", Author);