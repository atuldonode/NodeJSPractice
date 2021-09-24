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

router.post("/register", (req, res) => {
  console.log(req.body)
  if (req.body.designation !== "Admin") { 
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

router.post("/login", (req, res) => {
  authController
    .login(req.body)
    .then((resData) => {
      var userValidData = _.pick(resData, [
        "_id",
        "firstName",
        "lastName",
        "mobileNumber",
        "email",
        "designation",
      ]);
      encryptToken
        .encrypt(req, userValidData)
        .then((resToken) => {
          userValidData["token"] = resToken.token;
          var responseData = _.pick(userValidData, [
            "firstName",
            "lastName",
            "mobileNumber",
            "email",
            "designation",
            "token",
          ]);
          var responseobj = {
            id: resData._id,
            email: resData.email,
            profileURL: resData.profileURL,
            designation: resData.designation,
            firstName: resData.firstName, 
            lastName: resData.lastName,
            phone: resData.mobileNumber,
            address: resData.address,
            accessToken: userValidData.token,
          };
          response.successResponse(res, 200, responseobj);
        })
        .catch((error) => {
          log.error("error", error);
          response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
    })
    .catch((error) => {
      log.error("error", error);
      response.errorMsgResponse(res, 505, error);
    });
});

router.post("/login/by/social", (req, res) => {
  authController
    .loginWithSocial(req.body)
    .then((resData) => {
      var userValidData = _.pick(resData, [
        "_id",
        "firstName",
        "lastName",
        "mobileNumber",
        "email",
        "designation",
      ]);
      encryptToken.encrypt(req, userValidData).then((resToken) => {
        console.log("resToken", resToken.token);
        userValidData["token"] = resToken.token;
        var responseData = _.pick(userValidData, [
          "firstName",
          "lastName",
          "mobileNumber",
          "email",
          "designation",
          "token",
        ]);
        var responseobj = {
          id: resData._id,
          firstName: resData.firstName,
          lastName: resData.lastName,
          email: resData.email,
          accessToken: userValidData.token,
          loginType: resData.loginType,
        };
        response.successResponse(res, 200, responseobj);
      });
    })
    .catch((error) => {
      log.error("error", error);
      response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    });
});

router.get("/resend/otp/:mobile", (req, res) => {
  log.debug("/resend/otp/:mobile", req.params.mobile);
  if (req.params.mobile) {
    commonController
      .getOne(user, {
        mobileNumber: req.params.mobile
      })
      .then((resData) => {
        if (resData) {
          var otp = otpHelper.generateOTP();
          commonController
            .updateBy(user, resData._id, {
              otp: otp
            })
            .then((updatedOTP) => {
              sms(req.params.mobile, otp)
                .then((resOTP) => {
                  response.successResponse(res, 200, "Successfully send otp");
                })
                .catch((error) => {
                  log.error("error", error);
                  response.errorMsgResponse(res, 301, ERRORS.MOBILE_NOT_FOUND);
                });
            })
            .catch((error) => {
              log.error("error", error);
              response.errorMsgResponse(res, 301, ERRORS.MOBILE_NOT_FOUND);
            });
        } else {
          response.errorMsgResponse(res, 301, ERRORS.MOBILE_NOT_FOUND);
        }
      })
      .catch((error) => {
        log.error("error", error);
        response.errorMsgResponse(res, 301, error);
      });
  } else {
    response.errorMsgResponse(res, 301, ERRORS.MOBILE_NOT_FOUND);
  }
});

router.get("/resend/email/:email", (req, res) => {
  log.debug("/resend/email/:email", req.params.otp);
  var encryptedEmail = md5(req.params.email);
  if (req.params.email) {
    commonController
      .updateWithObject(
        user, {
          email: req.params.email
        }, {
          encryptedEmail: encryptedEmail
        }
      )
      .then((updatedOTP) => {
        var mailConfig = {
          from: config.auth.user,
          email: req.params.email,
          subject: "Verify your mail",
          out: "hi, <a href='" +
            config.emailVerifyURL +
            encryptedEmail +
            "'>click here</a> to verify your mail",
        };
        mail
          .sendMail(mailConfig)
          .then((resMail) => {
            log.info(resMail);
            response.successResponse(res, 200, "Successfully send Email");
          })
          .catch((error) => {
            log.error(error);
            response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
          });
      })
      .catch((error) => {
        log.debug("error", error);
        response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
      });
  } else {
    response.errorMsgResponse(res, 301, ERRORS.EMAIL_NOT_FOUND);
  }
});

router.get("/verify/email/:email", (req, res) => {
  log.debug("req", md5(req.params.email));
  authController
    .verifyEmail(md5(req.params.email))
    .then((resData) => {
      res.redirect(config.appURL);
    })
    .catch((error) => {
      log.error("error", error);
      response.errorMsgResponse(res, 301, error);
    });
});
router.get("/verify/mobile/:mobile/:otp", (req, res) => {
 log.debug("/verify/mobile/:mobile/:otp", req.params.otp);
 if (req.params.otp) {
    authController
    .verifyMobile(req.params.mobile, req.params.otp)
      .then((resData) => {
      response.successResponse(res, 200, "Mobile Number Verified");
    })
    .catch((error) => {
        log.error("error", error);
        response.errorMsgResponse(res, 301, error);
      });
  } else {
    response.errorMsgResponse(res, 301, ERRORS.WRONG_OTP);
  }
});

router.get("/send/otp/forgot/password/:mobileNumber", (req, res) => {
  user
    .findOne({
      mobileNumber: req.params.mobileNumber
    })
    .then((validData) => {
      if (validData) {
        var otp = otpHelper.generateOTP();
        if (req.params.mobileNumber) {
          commonController
            .updateWithObject(
              user, {
                mobileNumber: req.params.mobileNumber,
                isMobileVerified: "Verified",
              }, {
                otp: otp
              }
            )
            .then((updatedOTP) => {
              response.successResponse(res, 200, "otp sent");
              sms(req.params.mobileNumber, otp)
                .then((smsData) => {
                  console.log("smsData", smsData);
                })
                .catch((error) => {
                  log.debug("error", error);
                  response.errorMsgResponse(
                    res,
                    301,
                    ERRORS.SOMETHING_WENT_WRONG
                  );
                });
            })
            .catch((error) => {
              log.debug("error", error);
              response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
            });
        } else {
          response.errorMsgResponse(res, 301, ERRORS.EMAIL_NOT_FOUND);
        }
      } else {
        response.errorMsgResponse(res, 301, "your mobilenumber is not found ");
      }
    })
    .catch((error) => {
      log.error("error", error);
      response.errorMsgResponse(res, 301, error);
    });
});
router.post("/forget/password", (req, res) => {
  user
    .findOne({
      mobileNumber: req.body.mobileNumber
    })
    .then((validData) => {
      if (validData) {
        var obj = {};
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(req.body.password, salt, function (err, hash) {
            //  obj["password"] = hash;
            //  console.log("obj[]", obj["password"])
            commonController
              .updateWithObject(
                user, {
                  mobileNumber: req.body.mobileNumber,
                  otp: req.body.otp
                }, {
                  password: hash,
                  otp: null
                }
              )
              .then((resData) => {
                console.log("hash", hash);
                // console.log("resData", resData.password);
                response.successResponse(
                  res,
                  200,
                  "password updated Now you can login"
                );
              })
              .catch((error) => {
                console.log("error", error);
                response.errorMsgResponse(
                  res,
                  301,
                  ERRORS.SOMETHING_WENT_WRONG
                );
              });
          });
        });
      } else {
        response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
      }
    })
    .catch((error) => {
      console.log("error", error);
      response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    });
});
//get Teacher list
router.get("/getTeacherList", (req, res) => {
  commonController
    .getBy(user, {
      designation: {
        $eq: "Teacher"
      }
    })
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    });
});
//get all classes
router.get("/getClass", (req, res) => {
  commonController
    .getBy(user, {
      designation: {
        $eq: "Class"
      }
    })
    .then((resData) => {
      console.log("resData", resData);
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      console.log("error", error);
      response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    });
});

//get by regex Name Mobile , emailId

router.get("/getByRegex", (req, res) => {
  // var object = {
  //   email: req.body.email,
  //   firstName: req.body.firstName,
  // };

  user
    .find({
      // $or: [
      //   {
      email: {
        $regex: req.body.email,
      },
      // },
      //   {
      //     firstName: {
      //       $regex: req.body.firstName,
      //     },
      //   },
      // ],
    })
    .then((resData) => {
      console.log("resData", resData);
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      console.log("error", error);
      response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    });
});



router.get("/getProfile", auth, (req, res) => {
  user.aggregate([
    {
    $match : {
      _id : mongoose.Types.ObjectId(req.userId)
    }
   },
  ])
   .then((resData) => {
     response.successResponse(res, 200, resData)
   }).catch((error) => {
     response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG)
   })
 })


 router.put("/update/profile", auth, (req, res) => {
  commonController.updateBy(user , req.userId , req.body)
   .then((resData) => {
     commonController.getOne(user , {_id : req.userId})
     .then((data)=>{
      response.successResponse(res, 200, data)
    }).catch((error) => {
      response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG)
    })
   }).catch((error) => {
     response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG)
   })
 })




//  Admin Registration

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

router.post("/adminlogin", (req, res) => {
  authController
    .login(req.body)
    .then((resData) => {
      var userValidData = _.pick(resData, [
        "_id",
        "firstName",
        "lastName",
        "mobileNumber",
        "email",
        "designation",
      ]);
      encryptToken
        .encrypt(req, userValidData)
        .then((resToken) => {
          userValidData["token"] = resToken.token;
          var responseData = _.pick(userValidData, [
            "firstName",
            "lastName",
            "mobileNumber",
            "email",
            "designation",
            "token",
          ]);
          var responseobj = {
            id: resData._id,
            email: resData.email,
            profileURL: resData.profileURL,
            designation: resData.designation,
            firstName: resData.firstName, 
            lastName: resData.lastName,
            phone: resData.mobileNumber,
            address: resData.address,
            accessToken: userValidData.token,
          };
          response.successResponse(res, 200, responseobj);
        })
        .catch((error) => {
          log.error("error", error);
          response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
    })
    .catch((error) => {
      log.error("error", error);
      response.errorMsgResponse(res, 505, error);
    });
});

router.post("/adminlogin/by/social", (req, res) => {
  authController
    .loginWithSocial(req.body)
    .then((resData) => {
      var userValidData = _.pick(resData, [
        "_id",
        "firstName",
        "lastName",
        "mobileNumber",
        "email",
        "designation",
      ]);
      encryptToken.encrypt(req, userValidData).then((resToken) => {
        console.log("resToken", resToken.token);
        userValidData["token"] = resToken.token;
        var responseData = _.pick(userValidData, [
          "firstName",
          "lastName",
          "mobileNumber",
          "email",
          "designation",
          "token",
        ]);
        var responseobj = {
          id: resData._id,
          firstName: resData.firstName,
          lastName: resData.lastName,
          email: resData.email,
          accessToken: userValidData.token,
          loginType: resData.loginType,
        };
        response.successResponse(res, 200, responseobj);
      });
    })
    .catch((error) => {
      log.error("error", error);
      response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    });
});









module.exports = router;

//https://www.getpostman.com/collections/d98b54bd269184cfcf3c