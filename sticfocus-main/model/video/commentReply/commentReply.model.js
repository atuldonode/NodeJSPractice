const mongoose = require("mongoose");
Schema = mongoose.Schema;

const CommentReply = new Schema({
    videoId: {
        type: mongoose.Types.ObjectId,
        ref: "Video",
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    commentId: {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
    },
    comment: String,
    status: {
        type: String,
        default: "active",
    },
}, {
    timestamps: true,
});
module.exports = mongoose.model("CommentReply", CommentReply);