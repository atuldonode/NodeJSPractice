const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/RegLogin")
.then( () => {
console.log(`conection Succesfull`);
}).catch((e) => {
    console.log(e);
}); 
 
