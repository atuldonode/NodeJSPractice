const { application } = require("express");
const express = require("express");
const app = express();
const Mens = require("./models/mens");
const port = process.env.PORT | 3333;


app.post ("/", async (req, res) =>{
const insert = new Mens(req.body)

})



app.listen(port, (req, res) => {
    console.log(`listen from ${port}`);
})




