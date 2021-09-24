let router = require("express").Router();
let log = require("../../helper/logger");
let response = require("../../helper/response");
const commonController = require("../../controller/commonController");
const ERRORS = require("../../helper/errorMessage");
const mongoose = require("mongoose");
const auth = require("../../helper/auth");
const {
    db
} = require("../../model/topic.model");
const VideoComment = mongoose.model("VideoComment");


router.post("/add", auth, (req, res) => {
    log.debug("/add/video/comment")
    req.body["userId"] = req.userId
    commonController
        .add(VideoComment, req.body)
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
    VideoComment.aggregate([{
        $match: {
            videoId: mongoose.Types.ObjectId(req.params.videoId)
        }
    },
    {
        $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
        }
    },
    // {
    //     $unwind: "user"
    // },
    // {
    //     $lookup: {
    //         from: "commentreplylikes",
    //         localField: "_id",
    //         foreignField: "commentId",
    //         as: "likes",
    //     }
    // },
    // {
    //     $unwind: "likes"
    // },
    {
        $lookup: {
            from: "commentreplies",
            localField: "_id",
            foreignField: "commentId",
            as: "reply",
        }
    },
        // {
        //     $unwind: "reply"
        // },
        // {
        //     $project: {
        //         "likeCount": {
        //             $size: "$likes"
        //         },
        //         "replycount": {
        //             $size: "$reply"
        //         },
        //         "videoId": "$videoId",
        //         "comment": "$comment",
        //         "likeStatus": "true",
        //         "userId": {
        //             $first: "$user._id"
        //         },
        //         "email": {
        //             $first: "$user.email"
        //         },
        //         "avatar": {
        //             $first: "$user.avatar"
        //         },
        //         "firstName": {
        //             $first: "$user.firstName"
        //         },
        //         "lastName": {
        //             $first: "$user.lastName"
        //         },
        //         "mobileNumber": {
        //             $first: "$user.mobileNumber"
        //         }
        //     }
        // }
    ]).then((resData) => {
        response.successResponse(res, 200, resData);
    })
        .catch((error) => {
            log.error("error", error);
            response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
});

router.post("/add", auth, (req, res) => {
    log.debug("/add/video/comment/Like")
    req.body["userId"] = req.userId
    commonController
        .add(VideoCommentLike, req.body)
        .then((resData) => {
            response.successResponse(res, 200, resData);
        })
        .catch((error) => {
            log.error("error", error);
            response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
});

router.get("/getCommentLike/:videoId", (req, res) => {
    log.debug("/get/video/comment/Like")
    commonController
        .getBy(VideoCommentLike, {
            videoId: req.params.videoId
        })
        .then((resData) => {
            commonController.count(VideoCommentLike, {
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
    commonController.count(VideoComment, {
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
    VideoComment.findOneAndDelete({
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



// db.users.update({"email":"sakshi@gmail.com"} , {$set : {"firstName":"sakshi" ,"lastName":"dhenge" }})