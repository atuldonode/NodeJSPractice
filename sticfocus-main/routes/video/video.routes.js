let router = require("express").Router();
let log = require("../../helper/logger");
let response = require("../../helper/response");
const commonController = require("../../controller/commonController");
const ERRORS = require("../../helper/errorMessage");
const _ = require("lodash");
const mongoose = require("mongoose");
const Video = mongoose.model("Video");
const VideoComment = mongoose.model("VideoComment");
const VideoLike = mongoose.model("VideoLike");
const auth = require("../../helper/auth");

router.post("/add", auth, (req, res) => {
  log.debug("/api/add/video")
  req.body["userId"] = req.userId
  commonController.add(Video, req.body).then((resData) => {
    response.successResponse(res, 200, resData)
  }).catch((error) => {
    log.error("Error :", error);
    response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG)
  })
});

router.get("/getAll", (req, res) => {
  log.debug("/api/getAll/video")
  Video.aggregate([{
      $lookup: {
        from: "videolikes",
        let: {
          videoId: "$_id"
        },
        as: "likes",
        pipeline: [{
          $match: {
            $expr: {
              $or: [{
                $eq: ["$videoId", "$$videoId"]
              }]
            },
          },
        }, ],
      },
    },
    //   {
    //     $unwind: "$likes"
    //   },
    {
      $lookup: {
        from: "videocomments",
        let: {
          videoId: "$_id"
        },
        as: "comments",
        pipeline: [{
          $match: {
            $expr: {
              $or: [{
                $eq: ["$videoId", "$$videoId"]
              }]
            },
          },
        }, ],
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      }
    },
    {
      $unwind: "$user"
    },
    // {
    //   $lookup: {
    //     from: "videolikes",
    //     let: {
    //       userId: "$userId"
    //     },
    //     as: "likeStatus",
    //     pipeline: [{
    //       $match: {
    //         $expr: {
    //           $or: [{
    //             $eq: ["$userId", "$$userId"]
    //           }]
    //         },
    //       },
    //     }, ],
    //   },
    // },
    // {
    //   $unwind: "$likeStatus"
    // },
    {
      $project: {
        "likeCount": {
          $size: "$likes"
        },
        "commentCount": {
          $size: "$comments"
        },
        "videoURL": "$videoURL",
        "title": "$title",
        "thumbnail": "$thumbnail",
        "likeStatus": "true",
        "user": {
          "userId": "$user._id",
          "email": "$user.email",
          "avatar": "$user.avatar",
          "firstName": "$user.firstName",
          "lastName": "$user.lastName",
          "mobileNumber": "$user.mobileNumber"
        }
      }
    }
  ]).then((resData) => {
    response.successResponse(res, 200, resData)
  }).catch((error) => {
    log.error("Error :", error);
    response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG)
  })
});

router.get("/getBy/:userId", auth, (req, res) => {
  log.debug("/api/getById/video")
  commonController.getBy(Video, {
    userId: req.params.userId
  }).then((resData) => {
    commonController.count(Video, {
        userId: req.userId
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
  }).catch((error) => {
    log.error("Error :", error);
    response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG)
  })
});

router.delete("/delete/:id", auth, (req, res) => {
  log.debug("/api/delete/video")
  commonController.deletePRM(Video, {
    _id: req.params.id
  }).then((resData) => {
    response.successResponse(res, 200, resData)
  }).catch((error) => {
    log.error("Error :", error);
    response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG)
  })
});
module.exports = router