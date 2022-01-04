const mongoose = require("mongoose");
Schema = mongoose.Schema;

const qnaReply = new Schema({
    doctorId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    QnADoctorId: {
        type: mongoose.Types.ObjectId,
        ref: "QnADoctor",
    },
    Answer: String,
    status: {
        type: String,
        default: "active",
    },
});
module.exports = mongoose.model("qnaReply", qnaReply);