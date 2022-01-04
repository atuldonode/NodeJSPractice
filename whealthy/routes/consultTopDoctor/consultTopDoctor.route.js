const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const consultTopDoctor = mongoose.model("consultTopDoctor");
const log = require("../../helper/logger");
let auth = require("../../helper/auth");

router.get("/all", (req, res) => {
    log.debug("/api/consultTopDoctor");
    crudController
      .getAll(consultTopDoctor)
      .then((testData) => {
        response.successResponse(res, 200, testData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.get("/by/consultTopDoctorId/:id", (req, res) => {
    log.debug("/api/consultTopDoctor");
    crudController
    .getBy(consultTopDoctor, { _id: req.params.id })
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
  });

  router.post("/add", auth, (req, res) => {
    log.debug("/api/consultTopDoctor");
    crudController
      .add(consultTopDoctor, req.body)
      .then((testData) => {
        response.successResponse(res, 200, testData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.delete("/deleteId/:id", auth, (req, res) => {
    log.debug("/api/consultTopDoctor");
    crudController
      .delete(consultTopDoctor, req.params.id)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.put("/consultTopDoctorId/:id", auth, (req, res) => {
    log.debug("/api/consultTopDoctor");
    crudController
      .updateBy(consultTopDoctor, req.params.id, req.body)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });


  module.exports = router;