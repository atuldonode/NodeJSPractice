const mongoose = require("mongoose");

const Notification = require("../models/notification")


mongoose.connect("mongodb://localhost:27017/AllNotification")
.then( () => {
console.log(`conection Succesfull`);
}).catch((e) => {
    console.log(e);
}); 

Notification.deleteOne({})
    .then(() => {
        const Notifications = [];
        for (let i = 0; i < 1; i++) {
            Notifications.push({
                //
                title: "Notification",
                body : "Some one follow you",
            });
        }
        return Notification.create(Notifications);
        
    })
    .then(() => {
        process.exit();
    })
    .catch((e) => {
        console.log(e);
        process.exit(1); 
    });
























    // title: faker.lorem.sentence(),
                // body: faker.lorem.paragraph()