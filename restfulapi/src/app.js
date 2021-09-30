const express = require("express");
require("./db/conn");
const Student = require("./models/student");
const studentRouter = require("./router/stu");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(studentRouter);

app.get("/", (req, res) => {
    res.send("Yess hello from the other side")
});

app.post("/student", (req, res) => {
    console.log(req.body); 
    const user = new Student(req.body);

user.save().then(() =>{
    res.status(201).send(user);
}).catch((err) =>{
res.status(400).send(err);
});
})



app.listen(port, () => {
    console.log("port listening....!!!");
    });

















