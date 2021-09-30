let mongoose = require('mongoose');
    
    const NotificationSchema = new mongoose.Schema({
        title: String,
        body: String
    });
    const Notification = new mongoose.model("Notification", NotificationSchema);
    module.exports = Notification; 