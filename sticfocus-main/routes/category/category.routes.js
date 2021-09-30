let router = require("express").Router();
let log = require("../../helper/logger");
let response = require("../../helper/response");
const commonController = require("../../controller/commonController");
const ERRORS = require("../../helper/errorMessage");
const mongoose = require("mongoose");
const auth = require("../../helper/auth");

const db = require("../../model/topic.model");
const Category = mongoose.model("Category");

router.post("/category", (req, res) => {
    console.log(req.body);
    log.debug("/category/category/Category")
    req.body["userId"] = req.userId
    commonController
        .add(Category, req.body)
        .then((resData) => {

            response.successResponse(res, 200, resData);
        })
        .catch((error) => {
            log.error("error", error);
            response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
});


router.get("/getcategory/:userId", (req, res) => {
    log.debug("/getcategory/category/Category")
    commonController
        .getSingleRecordByPopulate(Category, {
            userId: req.params.userId
        }, "userId") 
        .then((resData) => {
            commonController.count(Category, {
                    userId: req.params.userId
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

module.exports = router;