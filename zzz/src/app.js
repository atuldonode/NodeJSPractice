const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const bcrypt = require("bcryptjs");

require("./db/conn");


// schemaa get
const Register = require("./models/regschema");
const Wishlist = require("./models/wishlist");
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



//set route
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

//wishlist
app.get("/wishlist", async(req, res) => {
  try {
      const Wishes = await Wishlist.find();
      res.send(Wishes);
  } catch(e) {
      res.send(e);
  }
})

app.post("/SaveWishlist", (req, res) => {
  // console.log(req.body.wish);
  //   res.send(req.body.wish);
  const Wish = Wishlist (req.body.savewishlist);
  
  Wish.save().then( () => {
      res.status(201).send("Wish Added to Wishlist!");
  }).catch( (e) => {
      res.status(400).send(e);
  })
})
 

app.patch("/UpdateWishlist/:id", async(req, res) => {
  try {
      const _id = req.params.id
      const UpdateRequest = await Wishlist.findByIdAndUpdate(_id, req.body)
      res.send(UpdateRequest);
  } catch(e) {
      res.status(404).send("Couldn't update your wish :(");
  }
})

app.delete("/DeleteWishlist/:id", async(req, res) => {
  try{
      console.log(req.params.id)
      const DeleteRequest = await Wishlist.findByIdAndDelete(req.params.id);
      res.send(DeleteRequest);
  } catch(e) {
      res.status(500).send("Couldn't delete your wish :(");
  }
})



app.listen(port, () => {
    console.log(`server is running at ${port}`);
});
