const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
let auth = require("../../helper/auth");
const qnaReply = mongoose.model("qnaReply");

router.post("/add", auth, (req, res) => {
    log.debug("/api/add/QnADoctor");
    req.body["doctorId"] = req.userId
    crudController
      .add(qnaReply, req.body)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });


  router.post("/all/qna", (req, res) => {
    log.debug("/api/QnADoctor");
    qnaReply.find({
      QnADoctorId: req.body.QnADoctorId,
      status: {$ne: "deleted"}
    })
    .populate("QnADoctorId")
    .populate("doctorId")
      .then((testData) => {
        response.successResponse(res, 200, testData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });


module.exports = router;