const mongoose = require("mongoose");
Schema = mongoose.Schema;

const VideoComment = new Schema({
    videoId: {
        type: mongoose.Types.ObjectId,
        ref: "Video",
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    comment: {
        type: String,
    },

    commentLike:{
        type:Boolean,
        default: false

    },

    commentdisLike:{
        type:Boolean,
        default:true
    },
    
    status: {
        type: String,
        default: "active",
    },
}, {
    timestamps: true,
});
module.exports = mongoose.model("VideoComment", VideoComment);