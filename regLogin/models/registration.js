const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("json-web-token")
 

const regSchema = new mongoose.Schema({
    FirstName:{
        type: String,
        required:true,
        minlength: 2
    }, 
    LastName:{
        type: String,
        required:true,
        minlength: 2
    }, 
    Email:{
        type:String,
        required: true,
        unique:[true, "Already Exists"],
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error ("Invalid MailID ")
            }
        }

    },
    Phone: {
        type:Number,
        unique: true,
        required: true,
        min:10,
    },
    SchooleCollegeName:{
        type: String,
        required:true
    },
    City:{
        type: String,
        required:true
    },
    State:{
        type: String,
        required:true
    },
    Address:{
        type: String,
        required:true
    },
    WorkPhoneNum: {
        type:Number,
        unique: true,
        required: true,
        min:10,
    },
    password:{
        type: String,
        required: true,
    },
    tokens:[{
        token:{
            type: String,
        required: true,
        } 
    }]
});

regSchema.methods.generateAuthToken = async function () {
    try {

        console.log(this._id);
        const token = jwt.sign({_id:this._id}, "mynameisatulvinoddonodesalanygvyufuyfuvy");
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;

        
    } catch (error) {
        response.send("the arror part" + error);
        console.log("the arror part" + error);
    }
}

regSchema.pre("save", async function(next) {

    if(this.isModified("password")) {
    
    this.password = await bcrypt.hash(this.password, 10);
    // this.repeatPassword = await bcrypt.hash(this.password, 10);

}
    next();
})
 

// we are create the model 

const Register = new mongoose.model("Register", regSchema);
module.exports = Register;

