let router = require("express").Router();
let log = require("../../helper/logger");
let response = require("../../helper/response");
const commonController = require("../../controller/commonController");
const ERRORS = require("../../helper/errorMessage");
const mongoose = require("mongoose");
const auth = require("../../helper/auth");

const db = require("../../model/topic.model");
const subCategory = mongoose.model("subCategory");

router.post("/subcategory", (req, res) => {
    console.log(req.body);
    log.debug("/subcategory/subcategory/subCategory")
    req.body["userid"] = req.userId
    commonController
        .add(subCategory, req.body)
        .then((resData) => {

            response.successResponse(res, 200, resData);
        })
        .catch((error) => {
            log.error("error", error);
            response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
});


router.get("/getsubcategory/:userId", (req, res) => {
    log.debug("/getsubcategory/subcategory/subCategory")
    commonController
        .getSingleRecordByPopulate(subCategory, {
            userId: req.params.userId
        }, "userId") 
        .then((resData) => {
            commonController.count(subCategory, {
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