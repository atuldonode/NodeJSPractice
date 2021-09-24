const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const Video = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    videoURL: String,
    title: String,
    hashtags: Array,
    thumbnail: String,

    status: {
        type: String,
        default: "active",
    },
}, {
    timestamps: true,
});
module.exports = mongoose.model("Video", Video);