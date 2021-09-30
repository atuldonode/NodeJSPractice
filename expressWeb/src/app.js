const express = require("express");
const app = express();
const path = require("path")
const port = 1000

// public static path 

const staticPath = path.join(__dirname, "../public");

app.set('view engine', 'hbs');

app.use(express.static(staticPath));


//roting 
app.get("", (req, res) => {
    res.render('index');            //hbs templet engine
// res.send("welcome  my page");
});

app.get("/about", (req, res) => {
    res.render('about');
    });

    app.get("/weather", (req, res) => {
        res.render('weather');
        });

        app.get("*", (req, res) => {
            res.send("404 error ooppsssss")
        });

app.listen(port, () => {
    console.log(`listen from ${port}`);
});

