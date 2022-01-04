const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const PatientDetails = mongoose.model("PatientDetails");
const log = require("../../helper/logger");
let auth = require("../../helper/auth");


router.post("/add", auth , (req, res) => {
    log.debug("/api/");
    req.body["patientId"] = req.userId
    crudController
      .add(PatientDetails, req.body)
      .then((testData) => {
        response.successResponse(res, 200, testData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });


  router.get("/getBy/patientId", auth, (req, res) => {
    log.debug("/api/");
    crudController
      .getBy(PatientDetails , {patientId : req.userId})
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.get("/get/:id", auth, (req, res) => {
    log.debug("/api/patientdetails");
    crudController
      .getOne(PatientDetails, { _id: req.params.id })
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });
  

  router.delete("/delete/patientId/:id", auth , (req, res) => {
    log.debug("/api/");
    crudController
      .delete(PatientDetails, req.params.id)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.put("/patientId/:id", auth , (req, res) => {
    crudController
      .updateBy(PatientDetails, req.params.id, req.body)
      .then(async(data) => {
        var userData = await crudController.getOne(PatientDetails, { _id: req.params.id })
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });


  module.exports = router;