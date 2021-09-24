let router = require("express").Router();
let log = require("../../helper/logger");
let response = require("../../helper/response");
const commonController = require("../../controller/commonController");
const ERRORS = require("../../helper/errorMessage");
const mongoose = require("mongoose");
const auth = require("../../helper/auth");
const Institude = mongoose.model("Institude");

router.post("/add", (req, res) => {
    log.debug("/add/Institude")
       commonController
           .add(Institude, req.body)
        .then((resData) => {
            response.successResponse(res, 200, resData);

        })
        .catch((error) => {
            log.error("error", error);
            response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
});



router.get("/get", (req, res) => {
    log.debug("/get/Institude")
    commonController
        .getAll(Institude)
        .then((resData) => {
            response.successResponse(res, 200, resData);
        })
        .catch((error) => {
            log.error("error", error);
            response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
});


router.put("/put/:id", (req, res) => {
    log.debug("/put/Institude")
    commonController
        .updateBy(Institude,req.params.id,req.body)
        .then((resData) => {
            response.successResponse(res, 200, resData);
        })
        .catch((error) => {
            log.error("error", error);
            response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
});




router.delete("/delete/:id", (req, res) => {
    log.debug("/delete/Institude")
    Institude.findOneAndDelete({
        _id: req.params.id
    
    })
        .then((resData) => {
            response.successResponse(res, 200, this.delete);
        })
        .catch((error) => {
            log.error("error", error);
            response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });

});

module.exports = router;





