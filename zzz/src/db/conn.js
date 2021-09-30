const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/e-shop")
.then( () => {
console.log(`conection Succesfull`);
}).catch((e) => {
    console.log(e);
}); 