const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
let auth = require("../../helper/auth");
const CommentLike = mongoose.model("CommentLike");

router.post("/add", auth, (req, res) => {
    log.debug("/add/comment/like")
    CommentLike.findOne({
        $and: [{
            userId: req.userId
        }, {
            doctorId: req.body.doctorId
        },
        {
            commentId: req.body.commentId
        }],
    })
        .then(async (resData) => {
            if (resData) {
                var lStatus = resData.likeStatus;
                lStatus = lStatus ? false : true;

                await crudController.updateBy(CommentLike, resData._id, { likeStatus: lStatus });
                const newData = await crudController.getOne(CommentLike, resData._id);

                response.successResponse(res, 200, newData);
            } else {
                req.body["userId"] = req.userId
                crudController
                    .add(CommentLike, req.body)
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

router.get("/get/commentLikeCount/:commentId", (req, res) => {
    log.debug("/get/comment/like/count")
    CommentLike.countDocuments({
        $and: [
            { commentId: req.params.commentId },
            { likeStatus: true }
        ],
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