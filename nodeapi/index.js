const express = require("express");
const app = express();
require("./db");
const UserSchema = require("./model");
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());

app.post('/add-user', async (req, res) => {
    try {
        console.log(req.body);
        const userData = new UserSchema(req.body);
        const addUser = await userData.save();
        res.send(addUser)
        console.log(addUser);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/", async (req, res) => {
    try {
        const showUser = await UserSchema.find();
        res.send(showUser)
        // console.log(showUser);
    } catch (error) {
        console.log(error);
    }
})

app.get("/user/:id", async(req, res) =>{
    try {
        console.log(req.params.id);
        const result = await UserSchema.findOne({_id: req.params.id})
        res.send(result)
    } catch (error) {
        console.log("error");
    }
})

app.delete("/delete/:id", async(req, res) =>{
    try {
        console.log(req.params.id);
        const result = await UserSchema.deleteOne({_id: req.params.id})
        res.send(result)
    } catch (error) {
        console.log("error");
    }
})

app.put("/edit/:id", async(req, res) =>{
    try {
    let result = await UserSchema.updateOne({
        id: req.params.id,
        $set: req.body
    })
    res.send({status: "data updated"})
    console.log(result);
    } catch (error) {
        console.log(';error');
    }
})

app.listen(1000, () => {
    console.log(`server Runing On 1000`);
});