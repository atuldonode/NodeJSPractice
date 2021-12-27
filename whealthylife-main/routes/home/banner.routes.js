const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const Banner = mongoose.model("Banner");
const log = require("../../helper/logger");
let auth = require("../../helper/auth");

router.get("/all", (req, res) => {
    log.debug("/api/");
    crudController
      .getAll(Banner)
      .then((testData) => {
        response.successResponse(res, 200, testData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.get("/by/bannerId/:id", (req, res) => {
    log.debug("/api/");
    crudController
    .getBy(Banner, { _id: req.params.id })
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
      .add(Banner, req.body)
      .then((testData) => {
        response.successResponse(res, 200, testData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.delete("/bannerId/:id", auth, (req, res) => {
    log.debug("/api/");
    crudController
      .delete(Banner, req.params.id)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.put("/bannerId/:id", auth, (req, res) => {
    crudController
      .updateBy(Banner, req.params.id, req.body)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.post("/search/banner", (req, res) => {
    log.debug("/api/");
    var search = req.body.search
    crudController
      .getBy(Banner, {
        pageName: {
          "$regex": search,
          $options: "i",
        }
      })
      .then((resData) => {
        response.successResponse(res, 200, resData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  module.exports = router;