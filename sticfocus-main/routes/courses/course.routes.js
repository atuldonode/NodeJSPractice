let router = require("express").Router();
let log = require("../../helper/logger");
let respletonse = require("../../helper/response");
const commonController = require("../../controller/commonController");
const ERRORS = require("../../helper/errorMessage");
const mongoose = require("mongoose");
const auth = require("../../helper/auth");
const Course = mongoose.model("Course");

router.post("/add", auth, (req, res) => {
    log.debug("/add/course")
    commonController
        .add(Course, req.body)
        .then((resData) => {
            response.successResponse(res, 200, resData);
        })
        .catch((error) => {
            log.error("error", error);
            response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
});

router.get("/get", (req, res) => {
    log.debug("/get/course")
    commonController
        .getAll(Course)
        .then((resData) => {
            response.successResponse(res, 200, resData);
        })
        .catch((error) => {
            log.error("error", error);
            response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
});



router.delete("/delete/:id", (req, res) => {
    log.debug("/delete/course")
    Course.findOneAndDelete({
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