const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        minlength: 2
    }, 
    email:{
        type:String,
        required: true,
        unique:[true, "Already Exists"],
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error ("Invalid MailID ")
            }
        }
 
    },
    phone: {
        type:Number,
        unique: true,
        required: true,
        min:10,
    },
    address:{
        type: String,
        required:true
    }
});

// we are create the model 

const Student = new mongoose.model("Student", studentSchema);
module.exports = Student;

