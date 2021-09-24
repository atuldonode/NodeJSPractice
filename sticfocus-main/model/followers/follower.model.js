const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const follower = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    followingId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    followStatus: { 
        type: String,
        enum: ["follow", "unFollow", "noFriend"],
        default: "noFriend"

    },
    status: {
        type: String,
        default: "active",
    },

}, {
    timestamps: true,
});
module.exports = mongoose.model("follower", follower);