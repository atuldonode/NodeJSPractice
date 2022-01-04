const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
let auth = require("../../helper/auth");
const QnADoctor = mongoose.model("QnADoctor");

router.post("/add", auth, (req, res) => {
    log.debug("/api/add/QnADoctor");
    req.body["userId"] = req.userId
    crudController
      .add(QnADoctor, req.body)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.put("/updateby/:id", auth , (req, res) => {
    crudController
      .updateBy(QnADoctor, req.params.id, req.body)
      .then((data) => {
        response.successResponse(res, 200, data);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.post("/QnADoctor", (req, res) => {
    log.debug("/api/QnADoctor");
    QnADoctor.find({
      doctorId: req.body.doctorId,
      status: {$ne: "deleted"}
    })
    .populate("userId")
    .populate("doctorId")
    .sort({"_id": -1})
      .then((testData) => {
        response.successResponse(res, 200, testData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.delete("/delete/:id", (req, res) => {
    log.debug("/api/QnADoctor");
    crudController
      .delete(QnADoctor, req.params.id)
      .then( (userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

module.exports = router;