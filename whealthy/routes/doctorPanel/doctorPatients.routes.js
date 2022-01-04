const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const  doctorPatients = mongoose.model("doctorPatients");
const log = require("../../helper/logger");

router.post("/add", (req, res) => {
    log.debug("/api/doctorPatients");
    crudController
      .add(doctorPatients, req.body)
      .then((testData) => {
        response.successResponse(res, 200, testData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

router.get("/get", (req, res) => {
    log.debug("/api/doctorPatients");
    crudController
      .getAll(doctorPatients)
      .then((testData) => {
        response.successResponse(res, 200, testData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.delete("/del/:id", (req, res) => {
    log.debug("/api/doctorPatients");
    crudController
      .delete(doctorPatients, req.params.id)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.put("/put/:id", (req, res) => {
    log.debug("/api/doctorPatients");
    crudController
      .updateBy(doctorPatients, req.params.id, req.body)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  module.exports = router;