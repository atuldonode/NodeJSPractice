const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const OurProduct = mongoose.model("OurProduct");
const OurProductCategory = mongoose.model("OurProductCategory");
const log = require("../../helper/logger");


router.post("/add", (req, res) => {
    log.debug("/api/");
    crudController
      .add(OurProduct, req.body)
      .then((testData) => {
        response.successResponse(res, 200, testData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.post("/category/add", (req, res) => {
    log.debug("/api/");
    crudController
      .add(OurProductCategory, req.body)
      .then((testData) => {
        response.successResponse(res, 200, testData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.get("/all/category", (req, res) => {
    log.debug("/api/");
    crudController
      .getAll(OurProductCategory)
      .then((testData) => {
        response.successResponse(res, 200, testData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

router.get("/all", (req, res) => {
    log.debug("/api/");
    crudController
      .getAll(OurProduct)
      .then((testData) => {
        response.successResponse(res, 200, testData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.get("/by/OurProductId/:id", (req, res) => {
    log.debug("/api/");
    crudController
    .getBy(OurProduct, { _id: req.params.id })
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
  });

  router.get("/by/category/:id", (req, res) => {
    log.debug("/api/");
    crudController
    .getBy(OurProduct, { categoryId: req.params.id })
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
  });

  router.delete("/deleteId/:id", (req, res) => {
    log.debug("/api/");
    crudController
      .delete(OurProduct, req.params.id)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.put("/OurProductId/:id", (req, res) => {
    crudController
      .updateBy(OurProduct, req.params.id, req.body)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  module.exports = router;