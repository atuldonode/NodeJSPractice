const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const MedicineCategory = mongoose.model("MedicineCategory");
const log = require("../../helper/logger");
let auth = require("../../helper/auth");

router.get("/all", (req, res) => {
    log.debug("/api/MedicineCategory");
    crudController
      .getAll(MedicineCategory)
      .then((testData) => {
        response.successResponse(res, 200, testData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.get("/by/MedicineCategoryId/:id", (req, res) => {
    log.debug("/api/MedicineCategory");
    crudController
    .getBy(MedicineCategory, { _id: req.params.id })
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
  });

  router.post("/add", auth, (req, res) => {
    log.debug("/api/MedicineCategory");
    crudController
      .add(MedicineCategory, req.body)
      .then((testData) => {
        response.successResponse(res, 200, testData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.delete("/deleteId/:id", auth, (req, res) => {
    log.debug("/api/MedicineCategory");
    crudController
      .delete(MedicineCategory, req.params.id)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.put("/MedicineCategoryId/:id", auth, (req, res) => {
    log.debug("/api/MedicineCategory");
    crudController
      .updateBy(MedicineCategory, req.params.id, req.body)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });


  module.exports = router;