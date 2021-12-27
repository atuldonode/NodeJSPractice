const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const Practice = mongoose.model("Practice");
const log = require("../../helper/logger");

router.get("/all", (req, res) => {
    log.debug("/api/all/practice");
    crudController
      .getAll(Practice)
      .then((testData) => {
        response.successResponse(res, 200, testData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.get("/by/practiceId/:id", (req, res) => {
    log.debug("/api/by/practiceId");
    crudController
    .getBy(Practice, { doctor_Id: req.params.id })
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
  });

  router.post("/add", (req, res) => {
    log.debug("/api/add");
    Practice.findOneAndDelete({doctor_Id : req.body.doctor_Id}, function(req, res){
      // successfully deleted
    });
        crudController
        .add(Practice, req.body)
      .then((testData) => {
        response.successResponse(res, 200, testData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });  
  });

  router.delete("/by/practiceId/:id", (req, res) => {
    log.debug("/api/by/practiceId");
    crudController
      .delete(Practice, req.params.id)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.put("/by/practiceId/:id", (req, res) => {
    crudController
      .updateBy(Practice, req.params.id, req.body)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });



module.exports = router;