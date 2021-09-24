let router = require("express").Router();
let log = require("../../helper/logger");
let response = require("../../helper/response");
const commonController = require("../../controller/commonController");
const ERRORS = require("../../helper/errorMessage");
const mongoose = require("mongoose");
const auth = require("../../helper/auth");
const VideoLike = mongoose.model("VideoLike");

router.post("/add", auth, (req, res) => {
    log.debug("/add/video/like")
    VideoLike.findOne({
            $and: [{
                userId: req.userId
            }, {
                videoId: req.body.videoId
            }],
        })
        .then((resData) => {
            if (resData) {
                VideoLike.findOneAndDelete({
                        videoId: req.body.videoId
                    })
                    .then((data) => {
                        response.successResponse(res, 200, data);
                    })
                    .catch((error) => {
                        log.error("error", error);
                        response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
                    });
            } else {
                req.body["userId"] = req.userId
                commonController
                    .add(VideoLike, req.body)
                    .then((data) => {
                        response.successResponse(res, 200, data);
                    })
                    .catch((error) => {
                        log.error("error", error);
                        response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
                    });
            }
        })
        .catch((error) => {
            log.error("error", error);
            response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
});

router.get("/getLikeCount/:videoId", (req, res) => {
    log.debug("/get/video/like/count")
    VideoLike.countDocuments({
            videoId: req.params.videoId
        })
        .then((data) => {
            response.successResponse(res, 200, data);
        })
        .catch((error) => {
            log.error("error", error);
            response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
});

        
module.exports = router;