const router = require("express").Router();
const crudController = require("../../../controllers/commonController/crudController");
const log = require("../../../helper/logger");
const response = require("../../../helper/response");
const mongoose = require("mongoose");
let auth = require("../../../helper/auth");
const ReplyCommentLike = mongoose.model("ReplyCommentLike");

router.post("/add", auth, (req, res) => {
    log.debug("/add/replycomment/like")
    ReplyCommentLike.findOne({
        $and: [{
            userId: req.userId
        }, 
        {
            doctorId: req.body.doctorId
        },
        {
            replyId: req.body.replyId
        }],
    })
        .then(async (resData) => {
            if (resData) {
                var lStatus = resData.likeStatus;
                lStatus = lStatus ? false : true;

                await crudController.updateBy(ReplyCommentLike, resData._id, { likeStatus: lStatus });
                const newData = await crudController.getOne(ReplyCommentLike, resData._id);

                response.successResponse(res, 200, newData);
            } else {
                req.body["userId"] = req.userId
                crudController
                    .add(ReplyCommentLike, req.body)
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

router.get("/get/commentLikeCount/:replyId", (req, res) => {
    log.debug("/get/replycomment/like/count")
    ReplyCommentLike.countDocuments({
        $and: [
            { replyId: req.params.replyId },
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