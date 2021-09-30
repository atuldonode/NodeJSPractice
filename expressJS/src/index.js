
const express = require("express");
const app = express();

const path = require("path");


 // hosting express js with html 
const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));            // builtin midlewere

app.use(express.static(staticPath));

app.get("/", (req, res) => {
    res.send("hello World");
});

app.get ("/about", (req, res) => {
    res.send("this is about Atul");
});

app.listen(8000, () =>{
    console.log("listen from port 8000");
});
