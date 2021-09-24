const mongoose = require("mongoose");
Schema = mongoose.Schema;

const CommentReplyLike = new Schema({
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
        ref: "CommentReply",
    },
    likeStatus: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "active",
    },
});
module.exports = mongoose.model("CommentReplyLike", CommentReplyLike);