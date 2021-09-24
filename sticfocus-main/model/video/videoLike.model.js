const mongoose = require("mongoose");
Schema = mongoose.Schema;

const VideoLike = new Schema({
    videoId: {
        type: mongoose.Types.ObjectId, 
        ref: "Video",
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    likeStatus : {
        type : Boolean,
        default : false
    },
    status: {
        type: String,
        default: "active",
    },
});
module.exports = mongoose.model("VideoLike", VideoLike);