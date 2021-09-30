const mongoose = require("mongoose");
Schema = mongoose.Schema


const NotificationList = new mongoose.Schema({
    Userid: [{ type: Schema.Types.ObjectId, ref: 'User' }],
videoLike:{
type: Number,
},
Comment: {
   type: Number,
},
CommentLike: {
    type: Number,
}, 
replyComment: {
    type: Number,
},
follow: {
    type: Number,
},

status:{
    type: String,
    default:"active"
}
});

module.exports = mongoose.model("NotificationList", NotificationList);

