const mongoose = require("mongoose");
Schema = mongoose.Schema;

const CommentReply = new Schema({
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
    date: String,
    comment: String,
    status: {
        type: String,
        default: "active",
    },
}, {
    timestamps: true,
});
module.exports = mongoose.model("CommentReply", CommentReply);