
//Url routing Module
const http = require ("http");
const fs = require ("fs"); 
const server = http.createServer((req, res) => {
    // console.log(req.url);
    if(req.url == "/"){
        res.end("hello from the Home side");
    } else if (req.url == "/about") {
        res.end("hello from the About side");
    } else if (req.url == "/contact") {
        res.end("This is my contactus");

//Covid Api

    } else if (req.url == "/covidapi") {
        fs.readFile("api.json", "utf-8", (err, data) => {
            console.log(data);
            const objData = JSON.parse(data);
            res.end(objData);
        });



    } else {
        res.writeHead(404, {"content-type": "text/html"})
        res.end("<h1> 404 error, page doest not exit </h1>");
    }
});

server.listen(8000, "127.0.0.1",( ) => {
    console.log("listening from 8000");
});


