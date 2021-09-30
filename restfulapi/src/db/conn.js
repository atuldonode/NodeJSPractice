const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/students-api")
.then(()=>{
    console.log("db conection succesfull....!!!");

}).catch((err) => {
    console.log("connection error");
})