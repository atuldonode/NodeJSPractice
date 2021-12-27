const mongoose = require("mongoose");
Schema = mongoose.Schema;

const QnADoctor = new Schema({
    doctorId: {
        type : mongoose.Types.ObjectId,
        ref : "User"
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    Heading: String,
    Description: String,
    reply: String,
    status: {
        type: String,
        default: "active",
    },
});
module.exports = mongoose.model("QnADoctor", QnADoctor);