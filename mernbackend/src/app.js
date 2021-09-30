const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const bcrypt = require("bcryptjs");

require("./db/conn");

const Register = require("./models/regschema");
const {json} = require("express");

const port = process.env.PORT || 8000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
 

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path); 
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
  res.render("index")
});

app.get("/register", (req, res) => {
    res.render("register")
});

app.get("/login", (req, res) => {
  res.render("login")
});
// //schema get

app.post("/register", async (req, res) => {
  try{

//     // console.log(req.body.firstname);
//     // res.send(req.body.firstname);
      const password = req.body.password;
      const Cpassword = req.body.repeatPassword;

if(password === Cpassword){
const registerEmployee = new Register({
  firstname: req.body.firstname,
  lastname: req.body.lastname,
  email: req.body.email,
  phone: req.body.phone,
  password:password,
  repeatPassword: Cpassword
})


// jwt
console.log("the sucess part" + registerEmployee);
const token = await registerEmployee.generateAuthToken();
console.log("the token part " + token);

 const registered = await registerEmployee.save();
 res.status(201).render("index");

}else{
  res.send("paswd not match")
}
  }catch (error){
    console.log(error);
  }
});

// login data 
app.post("/login", async(req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const useremail = await Register.findOne({email:email});
    const isMatch = await bcrypt.compare(password, useremail.password);

    const token = await useremail.generateAuthToken();           //jwt
    console.log("the token part " + token);

    if(isMatch){
      res.status(201).render("index");
    }else{
      res.send("invalid details");
    };
  } catch (error) {
    res.status(400).send(" invalid details")
  }
});

app.listen(port, () => {
    console.log(`server is running at ${port}`);
})



























//jwt

// const jwt = require("jsonwebtoken");
// const createToken = async () =>{
//   const token = await jwt.sign({_id:"613e30bfdbe40142a1ef2632"}, "mynameisatulvinoddonodesalangtola");

//   console.log(token);

//   const userver = await jwt.verify(token,"mynameisatulvinoddonodesalangtola" )
//   console.log(userver);
// }

// createToken();

// bcrypt hash 

// const bcrypt = require("bcrypt");

// const securePassword = async (password) =>{
//   const passwordHash = await bcrypt.hash(password, 10)
//   console.log(passwordHash);

//   const passwordMatch = await bcrypt.compare("atul", passwordHash)
//   console.log(passwordMatch);
// };

// securePassword("atul");