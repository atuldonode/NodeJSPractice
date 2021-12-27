const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const SlotPatientDetails = mongoose.model("SlotPatientDetails");
const log = require("../../helper/logger");
let auth = require("../../helper/auth");





  router.post("/getBy/patientId", auth, (req, res) => {
    log.debug("/api/SlotPatientDetails");
    crudController
      .getBy(SlotPatientDetails , {doctorId : req.userId, clinicId: req.body.clinicId})
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.post("/getBy/doctorId", (req, res) => {
    log.debug("/api/SlotPatientDetails");
    crudController
      .getBy(SlotPatientDetails , {doctorId : req.body.doctorId, clinicId: req.body.clinicId})
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.post("/getBy/doctorId/appointment", (req, res) => {
    log.debug("/api/SlotPatientDetails");
    crudController
      .getBy(SlotPatientDetails , {doctorId : req.body.doctorId})
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.post("/getBy/clinicId/appointment", (req, res) => {
    log.debug("/api/SlotPatientDetails");
    crudController
      .getBy(SlotPatientDetails , {clinicId: req.body.clinicId})
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.post("/getBy/monthWise", (req, res) => {
    log.debug("/api/SlotPatientDetails");

    const month = parseInt(req.body.month);

    crudController
      .getBy(SlotPatientDetails , {doctorId : req.body.doctorId, clinicId: req.body.clinicId, monthOfBooking: month})
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });
  


  module.exports = router;