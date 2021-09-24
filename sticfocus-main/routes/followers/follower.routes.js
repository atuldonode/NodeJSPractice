let router = require("express").Router();
let log = require("../../helper/logger");
let response = require("../../helper/response");
const commonController = require("../../controller/commonController");
const ERRORS = require("../../helper/errorMessage");
const mongoose = require("mongoose");
const auth = require("../../helper/auth");
const follower = mongoose.model("follower");

router.post("/add", auth, (req, res) => {
    log.debug("/add/follower")
    req.body["userId"] = req.userId
    commonController
        .add(follower, req.body)
        .then((resData) => {
            
            response.successResponse(res, 200,resData);
        })
        .catch((error) => {
            log.error("error", error);
            response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
});

router.get("/get", auth, (req, res) => {
    log.debug("/get/follower")
    req.body["userId"] = req.userId
    commonController
        .getfollowers(follower, req.userId)
        .then((resData) => {
            
            response.successResponse(res, 200,resData);
        })
        .catch((error) => {
            log.error("error", error);
            response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
});

module.exports = router;