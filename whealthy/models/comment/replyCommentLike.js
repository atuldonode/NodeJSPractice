const mongoose = require("mongoose");
Schema = mongoose.Schema;

const ReplyCommentLike = new Schema({
    doctorId: {
        type : mongoose.Types.ObjectId,
        ref : "Doctor"
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    commentId: {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
    },
    replyId: {
        type: mongoose.Types.ObjectId,
        ref: "ReplyComment",
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
module.exports = mongoose.model("ReplyCommentLike", ReplyCommentLike);