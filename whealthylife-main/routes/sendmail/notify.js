const log = require("../../helper/logger");
var nodemailer = require("nodemailer");
let config = require("../../config.json");
var fs = require("fs");
var http = require("https");

// router.post('/', (req, res) => {
module.exports = {

  sendMail: (data) => {
    return new Promise((resolve, reject) => {

  var options = {
    "method": "POST",
    "hostname": "api.pepipost.com",
    "port": null,
    "path": "/v2/sendEmail",
    "headers": {
      "content-type": "application/json",
      "api_key": ""
    }
  };
  
  var req = http.request(options, function (res) {
    var chunks = [];
  
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
  
    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });
  
  req.write(JSON.stringify({ personalizations: 
     [ { recipient: 'hi@welcom.com'} ],
    from: { fromEmail: 'xyz@yourdomain.com', fromName: 'YourCompanyName' },
    subject: 'Test email from Pepipost',
    content: 'Hi, This is my first test email',
  }));
  req.end();

})
}
  
  // sendMail: (data) => {
  //   return new Promise((resolve, reject) => {
  //     log.debug("/api/sendnotification/", data);
  //     var transporter = nodemailer.createTransport({
  //       service: "gmail",
  //       auth: {
  //         user: config.auth.user,
  //         pass: config.auth.pass,
  //       },
  //     });
  //     var mailOptions = {
  //       from: data.from,
  //       to: data.email,
  //       subject: data.subject,
  //       html: data.out,
  //     };
  //     transporter.sendMail(mailOptions, function (error, info) {
  //       if (error) {
  //         console.log(error);
  //         reject(error);
  //       } else {
  //         resolve(info.response);
  //       }
  //     });
  //   });
  // },

  // resetPass: (name) => {},
  // });
  // module.exports = router;
  // {
  //     out: "body",
  //     subject: "subject",
  //     email: "email",
  //     from: ""
};