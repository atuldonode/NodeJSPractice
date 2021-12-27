const router = require("express").Router();
const crudController = require("../../../controllers/commonController/crudController");
const log = require("../../../helper/logger");
const response = require("../../../helper/response");
const mongoose = require("mongoose");
let auth = require("../../../helper/auth");
const CommentReply = mongoose.model("CommentReply");


router.post("/add", auth, (req, res) => {
    log.debug("/api/add/CommentReply");
    req.body["userId"] = req.userId
    crudController
      .add(CommentReply, req.body)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.post("/getAll", async (req, res) => {
    log.debug("/api/CommentReply");

    sendData = []; 

    if(req.body.userId !== undefined || null || ""){
       const rData = await CommentReply.find({
            doctorId: req.body.doctorId,
            commentId: req.body.commentId,
            userId : req.body.userId,
            status: {$ne: "deleted"}
          }).populate("userId");

          rData.forEach(e => {
            sendData.push(e)
          })
    }

    CommentReply.find({
        userId: {$ne: req.body.userId},
        commentId: req.body.commentId,
        doctorId: req.body.doctorId,
        status: {$ne: "deleted"}
      })
      .populate("userId")
      .then(async(userData) => {

        userData.forEach(f => {
            sendData.push(f);
          })

        response.successResponse(res, 200, sendData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });  


  router.delete("/delete/:id", auth, (req, res) => {
    log.debug("/api/CommentReply");
    crudController
      .delete(CommentReply, req.params.id)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.put("/update/:id", auth, (req, res) => {
    log.debug("/api/CommentReply/:id");
    crudController
      .updateBy(CommentReply, req.params.id, req.body)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });
  

module.exports = router;