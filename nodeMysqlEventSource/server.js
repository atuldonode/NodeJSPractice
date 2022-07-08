const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});
// connection configurations
const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'real_time_api'
});
// connect to database
dbConn.connect();

let facts = [];
let clients = []
async function eventsHandler(request, response, next) {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    response.writeHead(200, headers);
    let time = new Date().toLocaleString('sv-SE', {timeZone: 'Asia/Kolkata'} )
    // console.log(time);
    let query1 = "SELECT * FROM users WHERE created_at >= '"+ time +"'"
    dbConn.query(query1, (error, results, fields) => {
        const data = `data: ${JSON.stringify(results)}\n\n`;
        response.write(data);
        console.log(data);
        response.end();
        const clientId = Date.now();

        const newClient = {
            id: clientId,
            response
        };

        clients.push(newClient);

        request.on('close', () => {
            console.log(`${clientId} Connection closed`);
            clients = clients.filter(client => client.id !== clientId);
        });
    });
};

app.get("/event", eventsHandler);


function sendEventsToAll(user) {
    clients.forEach(client => client.response.write(`data: ${JSON.stringify(user)}\n\n`))
}
app.post('/user', async (req, res) => {
    let user = req.body;
    if (!user) {
        return res.status(400).send({ error: true, message: 'Please provide user' });
    }
    else {
        let times = new Date()
        let time = new Date(times.getTime() + 5 * 60000).toLocaleString('sv-SE', {timeZone: 'Asia/Kolkata'} )
        console.log(time);
        let query2 = "INSERT INTO users (name, email, created_at) VALUES ('"+ user.name +"','" + user.email + "','" + time + "')";
        dbConn.query(query2, { name: user.name, email: user.email }, (error, results, fields) => {
            if (error) throw error;
            // res.json(user)
            return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
        });
        facts.push(user);
        return sendEventsToAll(user);
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
});

module.exports = app;