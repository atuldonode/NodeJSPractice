let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let database = require('./helper/database');
let fs = require('fs');
let config = require('./config.json');
let cors = require('cors');
const helmet = require('helmet');
var fbadmin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
var winston = require('winston');
var swig = require('swig');
const Socket = require("./controllers/socket.controller")



let app = express();
// enableCORS(app);
app.use(cors());
app.use(helmet.frameguard());
// app.options('*', cors());
database.initModels();


const server = require('http').Server(app);
const io = require('socket.io')(server);


attachBodyParser(app);
enableStaticFileServer(app, config.uploadUrl, '/static');
enableStaticFileServer(app, "/public/admin/", "/");

require('./routes')(app);
app.set('views', __dirname + '/routes/payment/views');
var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
database.connect();

fbadmin.initializeApp({
    credential: fbadmin.credential.cert(serviceAccount)
  
  })

// Make Public And Uploads Folder If Server Have Not
if (!fs.existsSync('./public')) {
    fs.mkdirSync('./public');
} else {
    if (!fs.existsSync('./public/uploads')) {
        fs.mkdirSync('./public/uploads');
    }
}

// Enable CORS
function enableCORS(expressInstance) {
    expressInstance.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, timeZone");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
        next();
    });
}

// Attach BodyParser
function attachBodyParser(expressInstance) {
    expressInstance.use(bodyParser.json());
    expressInstance.use(bodyParser.urlencoded({
        extended: true
    }));
}

function enableStaticFileServer(expressInstance, folderName, route) {
    app.use(route, express.static(path.join(__dirname, folderName)));
}
app.io = io;
global.socketIo = io;
require('./controllers/socket.controller')(io);

server.listen(config.server.port, () => {
    console.log('App listening on port : ', config.server.port);
});