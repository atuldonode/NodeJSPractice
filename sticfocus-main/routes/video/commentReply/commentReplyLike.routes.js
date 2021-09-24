let router = require("express").Router();
let log = require("../../../helper/logger");
let response = require("../../../helper/response");
const commonController = require("../../../controller/commonController");
const ERRORS = require("../../../helper/errorMessage");
const mongoose = require("mongoose");
const auth = require("../../../helper/auth");
const CommentReplyLike = mongoose.model("CommentReplyLike");

router.post("/add", auth, (req, res) => {
    log.debug("/add/video/comment")
    req.body["userId"] = req.userId
    commonController
        .add(CommentReplyLike, req.body)
        .then((resData) => {
            response.successResponse(res, 200, resData);
        })
        .catch((error) => {
            log.error("error", error);
            response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
});

router.get("/getComment/:videoId", (req, res) => {
    log.debug("/get/video/comment")
    commonController
        .getSingleRecordByPopulate(CommentReplyLike, {
            videoId: req.params.videoId
        }, "userId")
        .then((resData) => {
            commonController.count(CommentReplyLike, {
                    videoId: req.params.videoId
                })
                .then((data) => {
                    response.successResponse(res, 200, {
                        resData,
                        count: data
                    });
                })
                .catch((error) => {
                    log.error("error", error);
                    response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
                });
        })
        .catch((error) => {
            log.error("error", error);
            response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
});



router.get("/get/count/:videoId", (req, res) => {
    log.debug("/get/count/video/comment")
    commonController.count(CommentReplyLike, {
            videoId: req.params.videoId
        })
        .then((resData) => {
            response.successResponse(res, 200, resData);
        })
        .catch((error) => {
            log.error("error", error);
            response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
});

router.delete("/delete/:id", (req, res) => {
    log.debug("/delete/video/comment")
    CommentReplyLike.findOneAndDelete({
            _id: req.params.id
        })
        .then((resData) => {
            response.successResponse(res, 200, "deleted");
        })
        .catch((error) => {
            log.error("error", error);
            response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
});
module.exports = router;