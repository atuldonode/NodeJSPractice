const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const doctorClinic = new Schema({
    clinicId: {
        type: mongoose.Types.ObjectId,
        ref: 'Clinic'
    },
    doctorId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: "active"
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('doctorClinic', doctorClinic);