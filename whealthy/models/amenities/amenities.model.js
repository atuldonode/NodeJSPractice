const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const amenities = new Schema({
    name:String,
    Image:Array,
    status: {
        type: String,
        default: "active",
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('amenities', amenities);