const mongoose = require("mongoose");
Schema = mongoose.Schema;

const VideoDislike = new Schema({
    videoId: {
        type: mongoose.Types.ObjectId,
        ref: "Video",
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    
    DislikeStatus : {
        type : Boolean,
        default : false
    },
    status: {
        type: String,
        default: "active",
    },
});
module.exports = mongoose.model("VideoDislike", VideoDislike);