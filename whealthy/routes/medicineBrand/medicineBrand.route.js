const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const medicineBrand = mongoose.model("medicineBrand");
const fs = require("fs");
let auth = require("../../helper/auth");

router.post("/add", (req, res) => {
  log.debug("/api/medicineBrand");
  crudController
    .add(medicineBrand, req.body)
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/getAll", (req, res) => {
  log.debug("/api/medicineBrand");
  crudController
    .getAll(medicineBrand)
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.delete("/delete/:id", (req, res) => {
  log.debug("/api/medicineBrand");
  crudController
    .deletePerm(medicineBrand, req.params.id)
    .then(async (userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/search/brand", (req, res) => {
  log.debug("/api/medicineBrand");
  var search = req.body.search
  crudController
    .getBy(medicineBrand, {
        brand: {
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