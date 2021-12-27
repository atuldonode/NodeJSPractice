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


router.post("/add", auth , (req, res) => {
    log.debug("/api/SlotPatientDetails");
    req.body["patientId"] = req.userId

    req.body["monthOfBooking"] = parseInt(moment(req.body.date, 'ddd DD MM YYYY').format("M"));

    crudController
      .add(SlotPatientDetails, req.body)
      .then(async(testData) => {

        pDetails = await crudController.getOne(User, { _id: testData.patientId })
       
        

        crudController
      .getOne(User, { _id: req.body.doctorId })
      .then((userData) => {
        if (userData){

        sendMessage = {
          title: "WhealthyLife",
          message: "Appointment booked by " + pDetails.firstName + " on " + testData.date + " at " + testData.slotTime
      }

      notification
                  .notification(sendMessage, userData.deviceToken)
                  .then(async(FData) => {
                    
                    obj = {
                      notificationSent: sendMessage.message,
                      SlotPatientDetailsId: testData._id
                    }

                    await crudController
                        .add(NotificationSent, obj)

                    console.log("notification sent")
                  })
        }
      })
      .catch((error) => {
        log.error(error);
      });


        response.successResponse(res, 200, testData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });


  router.get("/getBy/patientId", auth, (req, res) => {
    log.debug("/api/SlotPatientDetails");
    crudController
      .getbySortByTwoPopulate(SlotPatientDetails , {patientId : req.userId},"clinicId", "doctorId")
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.get("/get/:id", auth,  (req, res) => {
    log.debug("/api/SlotPatientDetails");
    crudController
      .getOne(SlotPatientDetails, { _id: req.params.id })
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });
  

  router.delete("/delete/patientId/:id", auth , (req, res) => {
    log.debug("/api/SlotPatientDetails");
    crudController
      .delete(SlotPatientDetails, req.params.id)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.put("/patientId/:id", auth , (req, res) => {
    log.debug("/api/SlotPatientDetails");
    crudController
      .updateBy(SlotPatientDetails, req.params.id, req.body)
      .then(async(data) => {
        var userData = await crudController.getOne(SlotPatientDetails, { _id: req.params.id })
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });
  

  module.exports = router;