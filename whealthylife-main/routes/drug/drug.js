const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const auth = require("../../helper/auth");
const Drug = mongoose.model("Drug");

router.post("/add", auth, (req, res) => {
  log.debug("/api/");
  req.body["doctor_Id"] = req.userId
  crudController
    .add(Drug, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/getAll", auth, (req, res) => {
  log.debug("/api/");
  crudController
    .getBy(Drug , {doctor_Id : req.userId})
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/get/:id", auth, (req, res) => {
  log.debug("/api/");
  crudController
    .getOne(Drug, { _id: req.params.id })
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/getBy/doctor/:id", auth, (req, res) => {
  log.debug("/api/");
  crudController
    .getOne(Drug, { doctor_Id: req.params.id })
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.put("/update/:id", auth, (req, res) => {
  log.debug("/api/:id");
  crudController
    .updateBy(Drug, req.params.id, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.delete("/delete/:id", auth, (req, res) => {
  log.debug("/api/");
  crudController
    .delete(Drug, req.params.id)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});



module.exports = router;
