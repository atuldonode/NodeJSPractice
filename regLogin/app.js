 const express = require("express");
 require("./db/database");
 const bcrypt = require("bcrypt");
 const Register = require("./models/registration");
 const router = new express.Router();

 const app = express();
 const port = process.env.PORT || 8000;
 
app.use(express.json());

 app.post("/register", (req, res) => {
    // console.log(req.body); 
    const user = new Register(req.body);

user.save().then(() =>{
    res.status(201).send(user);
}).catch((err) =>{ 
res.status(400).send(err);
});
}) 

 app.listen(port, () => {
    console.log(`server is running at ${port}`);
})
