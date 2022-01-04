const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const MedicineBanner = mongoose.model("MedicineBanner");
const log = require("../../helper/logger");
let auth = require("../../helper/auth");

router.get("/all", (req, res) => {
    log.debug("/api/");
    crudController
      .getAll(MedicineBanner)
      .then((testData) => {
        response.successResponse(res, 200, testData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.get("/by/MedicineBannerId/:id", (req, res) => {
    log.debug("/api/");
    crudController
    .getBy(MedicineBanner, { _id: req.params.id })
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
  });

  router.post("/add", auth, (req, res) => {
    log.debug("/api/");
    crudController
      .add(MedicineBanner, req.body)
      .then((testData) => {
        response.successResponse(res, 200, testData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.delete("/deleteId/:id", auth, (req, res) => {
    log.debug("/api/");
    crudController
      .delete(MedicineBanner, req.params.id)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.put("/MedicineBannerId/:id", auth, (req, res) => {
    crudController
      .updateBy(MedicineBanner, req.params.id, req.body)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });


  module.exports = router;