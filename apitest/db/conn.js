const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/API-TEST")
.then(()=>{
    console.log("conection succesfull with DATBASE");
}).catch((err)=>{
    console.log(err);
})