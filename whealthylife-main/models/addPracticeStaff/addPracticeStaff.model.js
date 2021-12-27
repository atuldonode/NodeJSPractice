const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const AddPractice = new Schema({
    name: String,
    email: String,
    mobile: String,
    designation: String,
    clinicName: String,
    fees: String,
    numberOfPatient: String,
    doctorId: {
        type : mongoose.Types.ObjectId,
        ref : "User"
    },
    schedule: String,
    access: String,
    notification:{
            thisDoctor:{
                sms:{
                    type:Boolean,
                    default:false
                },
                emailId:{
                    type:Boolean,
                    default:false
                },
                whatsapp:{
                    type:Boolean,
                    default:false
                }
            },

            dailySchedule:{
                sms:{
                    type:Boolean,
                    default:false
                },
                emailId:{
                    type:Boolean,
                    default:false
                },
                whatsapp:{
                    type:Boolean,
                    default:false
                }
            },

            apointmentConfirmation:{
                sms:{
                    type:Boolean,
                    default:false
                },
                emailId:{
                    type:Boolean,
                    default:false
                },
                whatsapp:{
                    type:Boolean,
                    default:false
                }
            },

            allDoctors:{
                sms:{
                    type:Boolean,
                    default:false
                },
                emailId:{
                    type:Boolean,
                    default:false
                },
                whatsapp:{
                    type:Boolean,
                    default:false
                }
            }
    },
    status: {
        type: String,
        default: "active",
    },
}, {
    timestamps: true,
});
module.exports = mongoose.model("AddPractice", AddPractice);