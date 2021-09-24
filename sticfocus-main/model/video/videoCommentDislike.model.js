const mongoose = require("mongoose");
Schema = mongoose.Schema;

const VideoCommentDislike = new Schema({
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
        ref: "VideoComment",
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
module.exports = mongoose.model("VideoCommentDislike", VideoCommentDislike);