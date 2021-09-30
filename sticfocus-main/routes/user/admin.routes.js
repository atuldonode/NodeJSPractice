let router = require("express").Router();
let log = require("../helper/logger");
let response = require("../helper/response");
let otpHelper = require("../helper/otp");
let encryptToken = require("../helper/token");
let sms = require("../helper/sms");
let mail = require("./sendmail/notify");
let authController = require("../controller/auth");
const commonController = require("../controller/commonController");
const ERRORS = require("../helper/errorMessage");
const _ = require("lodash");
const mongoose = require("mongoose");
const user = mongoose.model("User");
var config = require("../config.json");
const auth = require("../helper/auth");
var md5 = require("md5");

var bcrypt = require("bcrypt");
const saltRounds = 10;
router.post("/adminregister", (req, res) => {
  console.log(req.body)
  if (req.body.designation === "Admin") { 
    user
      .findOne({
        $or: [{
            email: req.body.email
          },
          {
            mobileNumber: req.body.mobileNumber
          },
        ],
      })
      .then((resData) => {
        // console.log("resData ============>>>>", resData);
        if (resData) {
          if (resData.password) {
            console.log(resData.password)
            response.errorMsgResponse(
              res,
              301,
              ERRORS.USER_ALREADY_REGISTERED
            );
          } else {
            commonController
              .updateWithObject(user, {
                _id: resData._id
              }, req.body)
              .then((resData) => {
                console.log("designation", resData.designation);
                var otp = otpHelper.generateOTP();
                var encryptedEmail = md5(req.body.email);
                log.debug("otp", otp, encryptedEmail);
                commonController
                  .updateBy(user, resData._id, {
                    otp: otp,
                    encryptedEmail: encryptedEmail,
                  })
                  .then((updatedOTP) => {
                    // sms(req.body.mobileNumber, otp)
                    //   .then((resOTP) => {
                    //     console.log("resData ", resData);

                        response.successResponse(res, 200, updatedOTP);
                      })
                      .catch((error) => {
                        log.error("error", error);
                        response.errorMsgResponse(
                          res,
                          301,
                          ERRORS.SOMETHING_WENT_WRONG
                        );
                      });
                  // })
                  // .catch((error) => {
                  //   log.error("error", error);
                  //   response.errorMsgResponse(
                  //     res,
                  //     301,
                  //     ERRORS.SOMETHING_WENT_WRONG
                  //   );
                  // });
              })
              .catch((error) => {
                response.errorMsgResponse(res, 301, error);
              });
          }
        } else {
          console.log("==>>1reg")
          authController
            .register(req.body)
            .then((resData) => {
              var otp = otpHelper.generateOTP();
              var encryptedEmail = md5(req.body.email);
              log.debug("otp", otp, encryptedEmail);
              commonController
                .updateBy(user, resData._id, {
                  otp: otp,
                  encryptedEmail: encryptedEmail,
                })
                .then((updatedOTP) => {
                  console.log("updatedOTP", updatedOTP);
                  // sms(req.body.mobileNumber, otp)
                  //   .then((resOTP) => {
                    commonController.getOne(user , {_id:resData._id}).then((result)=>{
                        console.log("result ", result);
                    response.successResponse(res, 200, result);
                  }) .catch((error) => {
                    log.error("error", error);
                    response.errorMsgResponse(
                      res,
                      301,
                      ERRORS.SOMETHING_WENT_WRONG
                    );
                  });
                    })
                    .catch((error) => {
                      log.error("error", error);
                      response.errorMsgResponse(
                        res,
                        301,
                        ERRORS.SOMETHING_WENT_WRONG
                      );
                    });
                // })
                // .catch((error) => {
                //   log.error("error", error);
                //   response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
                // });
            })
            .catch((error) => {
              console.log("OTP Not found");
              response.errorMsgResponse(res, 301, error);
            });
        }
      });
  } else {
    response.errorMsgResponse(res, 301, ERRORS.ADMIN_CANNOT_BE_REEGISTER);
  }
});


