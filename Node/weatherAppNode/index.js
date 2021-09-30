const http = require("http");
const fs = require ("fs");
var requests = require("requests");

const homeFile = fs.readFileSync("home.html", "utf-8");

const replaceVal = (temVal, orgVal) => {
    let temperature = temVal.replace("{%tempval%}", orgVal.main.temp);
    temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
    temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
    temperature = temperature.replace("{%location%}", orgVal.name);
    // temperature = temperature.replace("{%country%}", orgVal.main.sys.country);
    return temperature;
}

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests('https://api.openweathermap.org/data/2.5/weather?q=pune&appid=05585cb0856dcc4872f6356e346cd819')
        .on("data", (chunk) => {
            const objData = JSON.parse(chunk);
            const arrData = [objData];
            // console.log(arrData[0].main.temp);
            const realTimeData = arrData
            .map((val) => replaceVal(homeFile, val))
            .join("");
            res.write(realTimeData);
            // console.log(realTimeData);
        })
        .on("end", (err) => {
        if (err) return console.log("connection closed due to errors", err);
        res.end();
        });
    }
});
server.listen(8000, "127.0.0.1");
