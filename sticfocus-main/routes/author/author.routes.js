let router = require("express").Router();
let log = require("../../helper/logger");
let response = require("../../helper/response");
const commonController = require("../../controller/commonController");
const ERRORS = require("../../helper/errorMessage");
const mongoose = require("mongoose");
const auth = require("../../helper/auth");
const Author = mongoose.model("Author");

router.post("/add", (req, res) => {
    log.debug("/add/Author")
    commonController
        .add(Author, req.body)
        .then((resData) => {
            response.successResponse(res, 200, resData);

        })
        .catch((error) => {
            log.error("error", error);
            response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
});



router.get("/get", (req, res) => {
    log.debug("/get/Author")
    commonController
        .getAll(Author)
        .then((resData) => {
            response.successResponse(res, 200, resData);
        })
        .catch((error) => {
            log.error("error", error);
            response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
});



module.exports = router;