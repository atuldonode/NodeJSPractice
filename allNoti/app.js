const express = require("express");
require ("./db/seed");
const router = new express.Router();
const Notification = require("./models/notification");
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

router.post('/Notifications', (req, res, next) => {
//     Notification.find({}, {title: true}).exec((err, Notifications) => {
//         res.render('index', { Notifications });
//     });
// });
console.log(req.body); 
const user = new Notification(req.body);

user.save().then(() =>{
res.status(201).send(user);
}).catch((err) =>{
res.status(400).send(err);
}); 
})

router.get('/Notifications/:id', (req, res, next) => {
    Notification.findOne({ _id: req.params.id }).exec((err, Notification) => {
        res.render('Notification', { post });
    });
});

 app.listen(port, () => {
    console.log(`server is running at ${port}`);
})


