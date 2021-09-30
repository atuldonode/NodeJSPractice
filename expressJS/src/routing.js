const express = require("express");
const app = express();

const port = 8000;

app.get("/", (req, res) => {                    //home page
    res.send("Welcome My Home page");
});

app.get("/about",  (req, res) => {              //about page
    res.send("Welcome my About Page")
});

app.get("/contact", (req, res) => {             //contact page     json data
    res.json([
    {
        id: 1,
        name: "atul",
        city: "salangtola",
    },
    {
        id: 1,
        name: "atul",
        city: "salangtola",
    },
    {
        id: 1,
        name: "atul",
        city: "salangtola",
    },
    ]);
});

app.listen(port, () => {
    console.log(`listening port number: ${port}`);
});

