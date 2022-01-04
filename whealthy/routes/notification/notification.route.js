const router = require("express").Router();
var http = require("http");
const crudController = require("../../controllers/commonController/crudController");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const SlotPatientDetails = mongoose.model("SlotPatientDetails");
const User = mongoose.model("User");
const log = require("../../helper/logger");
var config = require("../../config.json");
let mail = require("../sendmail/notify");
let sms = require("../../helper/sms");
let request = require("request");
let auth = require("../../helper/auth");
let otpHelper = require("../../helper/otp");
const fetch = require('node-fetch');
var moment = require("moment");
const notification = require("../../helper/notification");
const NotificationSent = mongoose.model("NotificationSent");


  router.get("/getAll/NotificationSent", auth, (req, res) => {
    log.debug("/api/NotificationSent");
    crudController
      .getWithSortByPopulate(NotificationSent , "SlotPatientDetailsId")
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  module.exports = router;