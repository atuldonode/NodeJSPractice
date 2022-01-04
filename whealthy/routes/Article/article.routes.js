const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const  Article = mongoose.model("Article");
const log = require("../../helper/logger");
let auth = require("../../helper/auth");

router.post("/add",auth, (req, res) => {
    log.debug("/api/article");
    crudController
      .add(Article, req.body)
      .then((testData) => {
        response.successResponse(res, 200, testData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

router.get("/getAll", (req, res) => {
    log.debug("/api/article");
    crudController
      .getAll(Article)
      .then((testData) => {
        response.successResponse(res, 200, testData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.get("/get/:id", auth, (req, res) => {
    log.debug("/api/Article");
    crudController
      .getOne(Article, {_id: req.params.id})
      .then(async (testData) => {
       
        response.successResponse(res, 200, testData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.delete("/delete/:id", auth, (req, res) => {
    log.debug("/api/article");
    crudController
      .delete(Article, req.params.id)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.put("/put/:id", auth, (req, res) => {
    log.debug("/api/article");
    crudController
      .updateBy(Article, req.params.id, req.body)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  module.exports = router;