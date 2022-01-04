const mongoose = require("mongoose");
Schema = mongoose.Schema;

const CommentLike = new Schema({
    doctorId: {
        type : mongoose.Types.ObjectId,
        ref : "User"
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    commentId: {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
    },
    likeStatus: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        default: "active",
    },
});
module.exports = mongoose.model("CommentLike", CommentLike);