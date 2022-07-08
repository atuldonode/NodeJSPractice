const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/usersdb', ()=>{
    try {
        console.log("DB connect Succesfully");
    } catch (error) {
        console.log("error");
    }
}) 