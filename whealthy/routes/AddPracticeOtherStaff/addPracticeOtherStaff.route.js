const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const AddPracticeOtherStaff = mongoose.model("AddPracticeOtherStaff");
let auth = require("../../helper/auth");

router.post("/add", auth, (req, res) => {
  log.debug("/api/add");
  req.body["doctorId"] = req.userId
  crudController
    .add(AddPracticeOtherStaff, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/getBy/doctorId", auth, (req, res) => {
  log.debug("/api/");
  crudController
    .getBy(AddPracticeOtherStaff , {doctorId : req.userId})
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
    .getOne(AddPracticeOtherStaff, { _id: req.params.id })
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
    .updateBy(AddPracticeOtherStaff, req.params.id, req.body)
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
    .delete(AddPracticeOtherStaff, req.params.id)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});


module.exports = router;
