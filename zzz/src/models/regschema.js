const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const { response } = require("express");


const regSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true,
    },
    lastname:{
        type: String
    },
    email:{
        type: String, 
        required : true, 
        unique: true
    },
    phone:{
        type: Number,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    repeatPassword:{
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

//generating tokens
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


//bcrypt hash

regSchema.pre("save", async function(next) {

    if(this.isModified("password")) {
    
    this.password = await bcrypt.hash(this.password, 10);
    this.repeatPassword = await bcrypt.hash(this.password, 10);

}
    next();
})


//create collection 
const Register = new mongoose.model("Register", regSchema);

module.exports = Register;
