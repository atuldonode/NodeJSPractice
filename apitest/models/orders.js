const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    productname: String,
    status:{
        type: String, 
        enum: [
            "PENDING",
            "DELIVERED"
        ]
    },
    createDate:{
        type: Date,
        default: Date.now
    }
});

const Order = new mongoose.model("Order", orderSchema);
module.exports = Order;