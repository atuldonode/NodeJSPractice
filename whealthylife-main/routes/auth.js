let router = require("express").Router();
let log = require("../helper/logger");
let response = require("../helper/response");
let otpHelper = require("../helper/otp");
let encryptToken = require("../helper/tokens");
let sms = require("../helper/sms");
let mail = require("./sendmail/notify");
let authController = require("../controllers/auth");
const commonController = require("../controllers/commonController/crudController");
const ERRORS = require("../helper/errorMessages");
const _ = require("lodash");
const mongoose = require("mongoose");
const user = mongoose.model("User");
const Token = mongoose.model("Token");
const Location = mongoose.model("Location");
var config = require("../config.json");
var md5 = require("md5");
var moment = require("moment");

const bcrypt = require("bcrypt");
const auth = require("../controllers/auth");
const crudController = require("../controllers/commonController/crudController");
const saltRounds = 10;
const { v4: uuidv4 } = require('uuid');



router.post("/register", (req, res) => {
  
  if (req.body.designation !== "Admin") {
    authController
      .register(req.body)
      .then((resData) => {
        
        console.log("===>>>>>1")
        if(req.body.email !== undefined || null && req.body.mobileNumber !== undefined || null ){
        var otp = otpHelper.generateOTP();
        var encryptedEmail = md5(req.body.email);
        log.debug("otp", otp, encryptedEmail);
        resData.otp = otp;
       
        commonController
        .updateBy(user, resData._id, {
          otp: otp,
          encryptedEmail: encryptedEmail,
        })
        .then((updatedOTP) => {
          sms(req.body.mobileNumber, otp)
          .then((resOTP) => {
            console.log("resData", resData);
            response.successResponse(res, 200, resData);
            var mailConfig = {
              from: config.auth.user,
              email: req.body.email,
              subject: "Verify your mail",
              out: "hi, <a href='" +
              config.emailVerifyURL +
              encryptedEmail +
              "'>click here</a> to verify your mail",
            };
            mail
            .sendMail(mailConfig)
            .then((resMail) => {
              console.log(".........EMAIL")
              log.info(resMail);
            })
            .catch((error) => {
              log.error(error);
            });
          })
          .catch((error) => {
            log.error("error", error);
            // response.errorMsgResponse(res, 404, ERRORS.SOMETHING_WENT_WRONG);
          });
        })
        .catch((error) => {
          log.error("error", error);
          response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
      }else{
        response.successResponse(res, 200, resData);
      }
      
    })
    .catch((error) => {
      response.errorMsgResponse(res, 505, error);
    });
  } else {
    response.errorMsgResponse(res, 301, ERRORS.ADMIN_CANNOT_BE_REEGISTER);
  }
});

router.post("/login/with/social", (req, res) => {
  authController
  .loginWithSocial(req.body)
  .then((resData) => {
    var userValidData = _.pick(resData, [
        // response.successResponse(res, 200, resData)
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
            "_id",
            "firstName",
            "lastName",
            "mobileNumber",
            "email",
            "designation",
            "token",
          ]);
          var ua = req.headers["user-agent"];
          var obj = {};
          var isBrowser = false;
          if (/webOS\//.test(ua)) isBrowser = true;
          if (/(Intel|PPC) Mac OS X/.test(ua)) isBrowser = true;
          if (/Windows NT/.test(ua)) isBrowser = true;
          if (isBrowser) {
            obj = "Desktop";
          } else {
            obj = "Smartphone";
          }
          commonController
        .updateBy(user, resData._id, {
          deviceToken: req.body.deviceToken,
              platform: obj,
        })
            .then((data) => {
              log.debug("device token saved successfully", data);
            })
            .catch((error) => {
              log.debug("Add token error", error);
            });
          response.successResponse(res, 200, responseData);
        })
        .catch((error) => {
          log.error("error", error);
          response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
      response.successResponse(res, 200, responseData);
    })
    .catch((error) => {
      response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    });
});

router.post("/login", (req, res) => {
  console.log("req", req.get("User-Agent"));
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
            "_id",
            "firstName",
            "lastName",
            "mobileNumber",
            "email",
            "designation",
            "token",
          ]);
          var ua = req.headers["user-agent"];
          var obj = {};
          var isBrowser = false;
          if (/webOS\//.test(ua)) isBrowser = true;
          if (/(Intel|PPC) Mac OS X/.test(ua)) isBrowser = true;
          if (/Windows NT/.test(ua)) isBrowser = true;
          if (isBrowser) {
            obj = "Desktop";
          } else {
            obj = "Smartphone";
          }
          commonController
        .updateBy(user, resData._id, {
          deviceToken: req.body.deviceToken,
              platform: obj,
        })
            .then((data) => {
              log.debug("device token saved successfully", data);
            })
            .catch((error) => {
              log.debug("Add token error", error);
            });
          response.successResponse(res, 200, responseData);
        })
        .catch((error) => {
          log.error("error", error);
          response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
    })
    .catch((error) => {
      log.error("error", error);
      response.errorMsgResponse(res, 301, error);
    });
});

router.get("/resend/otp/:mobile", (req, res) => {
  console.log("/resend/otp/:mobile", req.params.mobile);
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

              const  mssg = otp + " is the OTAC (One Time Authentication Code) for your Whealthylife login. NEVER SHARE ANY OTP WITH ANYONE.";

              sms(req.params.mobile, mssg)
                .then((resOTP) => {
                  let data = {
                    message: "successfully sent otp",
                    otp: otp,
                  };
                  response.successResponse(res, 200, data);
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
  log.debug("req", email);
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
            response.successResponse(res, 200, responseData);
          })
          .catch((error) => {
            log.error("error", error);
            response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
          });
      })
      .catch((error) => {
        log.error("error", error);
        response.errorMsgResponse(res, 301, error);
      });
  } else {
    response.errorMsgResponse(res, 301, ERRORS.WRONG_OTP);
  }
});

function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

router.post("/forgot/password", (req, res) => {
  if (isNumeric(req.body.email)) {
    commonController
      .getOne(user, {
        mobileNumber: req.body.email,
        isMobileVerified: "Verified",
      })
      .then((resData) => {
        if (resData) {
          var tenMin = moment().add(10, "minutes");
          console.log("tenMin", tenMin);
          var otp = otpHelper.generateOTP();
          commonController
            .updateBy(user, resData._id, {
              otp: otp,
              otpExpires: tenMin
            })
            .then((updatedOTP) => {
              sms(req.body.email, otp)
                .then((resOTP) => {
                  let data = {
                    message: "successfully sent otp",
                    otp: otp,
                  };
                  response.successResponse(res, 200, data);
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
    commonController.getOne(user, {
      email: req.body.email
    }).then((resData) => {
      if (resData) {
        var otp = otpHelper.generateOTP();
        var tenMin = moment().add(10, "minutes");
        commonController
          .updateBy(user, resData._id, {
            otp: otp,
            otpExpires: tenMin
          })
          .then((updatedOTP) => {
            var mailConfig = {
              from: config.auth.user,
              email: req.body.email,
              subject: "Reset Password for WhealthyLife",
              out: "hi, for resetting password your OTP is " +
                otp +
                ". This OTP will expires after 10 minutes.",
            };

            mail
              .sendMail(mailConfig)
              .then((resMail) => {
                log.info(resMail);
                response.successResponse(res, 200, "Successfully send Email");
              })
              .catch((error) => {
                log.error(error);
                response.errorMsgResponse(res, 301, ERRORS.EMAIL_NOT_FOUND);
              });
          })
          .catch((error) => {
            log.error("error", error);
            response.errorMsgResponse(res, 301, ERRORS.EMAIL_NOT_FOUND);
          });
      } else {
        response.errorMsgResponse(res, 301, ERRORS.EMAIL_NOT_FOUND);
      }
    });
  }
});

router.post("/update/password", (req, res) => {
  var obj;
  var now = moment();
  if (isNumeric(req.body.email)) {
    obj = {
      $and: [{
          mobileNumber: req.body.email
        },
        {
          otp: req.body.otp
        },
        // { otpExpires: { $gte: now } },
      ],
    };
  } else {
    obj = {
      $and: [{
          email: req.body.email
        },
        {
          otp: req.body.otp
        },
        // { otpExpires: { $gte: now } },
      ],
    };
  }
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      commonController
        .updateWithObject(user, obj, {
          otp: null,
          password: hash,
          otpExpires: null,
        })
        .then((resUser) => {
          console.log("resUser", resUser);
          if (resUser) {
            response.successResponse(res, 200, "Password changed successfully");
            var mailConfig = {
              from: config.auth.user,
              email: resUser.email,
              subject: "Password changed successfully",
              out: "hi, your password is change successfully",
            };

            mail
              .sendMail(mailConfig)
              .then((resMail) => {
                log.info(resMail);
              })
              .catch((error) => {
                log.error(error);
              });
          } else {
            response.errorMsgResponse(res, 301, ERRORS.EMAIL_NOT_FOUND);
          }
        })
        .catch((error) => {
          log.debug("error", error);
          response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
    });
  });
});

router.post("/verify/otp", (req, res) => {
  var obj;
  if (isNumeric(req.body.email)) {
    obj = {
      mobileNumber: req.body.email,
      otp: req.body.otp,
    };
  } else {
    obj = {
      email: req.body.email,
      otp: req.body.otp,
    };
  }
  commonController
    .getOne(user, obj)
    .then((resUser) => {
      if (resUser) {
        response.successResponse(res, 200, "OTP verified succesfully");
      } else {
        response.errorMsgResponse(res, 301, ERRORS.WRONG_OTP);
      }
    })
    .catch((error) => {
      log.debug("error", error);
    });
});


router.get("/get/location/regex/:search", (req, res) => {
  var search = req.params.search;

  Location.aggregate([{
        $match: {
          city: {
            $regex: search,
            $options: "i",
          }
        },
      },
      {
        $lookup: {
          from: "clinics",
          localField: "clinicId",
          foreignField: "_id",
          as: "clinic"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "doctorId",
          foreignField: "_id",
          as: "doctor"
        }
      },
      {
        $group: {
          // _id: "$_id",
          _id: "$city"
          // $group: {
          //   city: "$_city"
          // }
          // city: "$city",
          // standardId: {
          //   $first: "$standardId",
          // },
        }
      }
      // {
      //   $lookup: {
      //     from: "Clinics",
      //     let: {
      //       clinicId: "$_id"
      //     },
      //     as: "clinics",
      //     pipeline: [{
      //       $match: {
      //         $expr: {
      //           $or: [{
      //             $eq: ["$clinicId", "$$clinicId"]
      //           }]
      //         },
      //       },
      //     }, ],
      //   },
      // },
      // {
      //   $lookup: {
      //     from: "users",
      //     let: {
      //       doctorId: "$_id"
      //     },
      //     as: "doctors",
      //     pipeline: [{
      //       $match: {
      //         $expr: {
      //           $or: [{
      //             $eq: ["$doctorId", "$$doctorId"]
      //           }]
      //         },
      //       },
      //     }, ],
      //   },
      // }
    ])

    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      console.log("error", error);
      response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    });
});



// router.post("/get/search/location/everything", (req, res) => {

//   Location.aggregate([{
//     $match: {
//       city: {
//         $regex: req.body.cityName,
//         $options: "i",
//       }
//     },
//   },
//   {
//     $lookup: {
//       from: "clinics",
//       localField: "clinicId",
//       foreignField: "_id",
//       as: "clinic"
//     }
//   },
//   {
//     $lookup: {
//       from: "users",
//       localField: "doctorId",
//       foreignField: "_id",
//       as: "doctor"
//     }
//   },
//   {
//     $group: {
//       _id: "$city"
//     }
//   }
// ])
//     .then((resData) => {
//       response.successResponse(res, 200, resData);
//     })
//     .catch((error) => {
//       console.log("error", error);
//       response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
//     });
// });



router.get("/get/city", (req, res) => {
  Location.aggregate([{
      $group: {
        _id: "$city"
      }
    }])
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      console.log("error", error);
      response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    });
});

router.post("/get/doctor/clinic/city", (req, res) => {
  Location.aggregate([{
        $match: {
          $and: [{
              city: req.body.city
            },
            {
              status: {
                $ne: "deleted"
              }
            }
          ]
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "doctorId",
          foreignField: "_id",
          as: "doctor"
        }
      },
      {
        $lookup: {
          from: "doctorsqualifications",
          localField: "doctor._id",
          foreignField: "doctorId",
          as: "qualify"
        }
      },
      {
        $lookup: {
          from: "qualifications",
          localField: "qualify.qualificationId",
          foreignField: "_id",
          as: "qualifyRes",
        },
      },
      {
        $lookup: {
          from: "doctorsspecializations",
          localField: "doctor._id",
          foreignField: "doctorId",
          as: "specialRes"
        }
      },
      {
        $lookup: {
          from: "specializations",
          localField: "specialRes.specializationId",
          foreignField: "_id",
          as: "special",
        },
      },
      // {
      //   $group:{
      //     _id : "$_id",
      //     firstName:"$doctor.firstName",
      //     // lastName: "$doctor.lastName",
      //     // avatar: "$doctor.avatar",
      //     // designation:"$doctor.designation",
      //   }
      // }
      {
        $project: {
          "_id": "$_id",
          "doctorId": {
            $first: "$doctor._id"
          },
          "firstName": {
            $first: "$doctor.firstName"
          },
          "lastName": {
            $first: "$doctor.lastName"
          },
          "avatar": {
            $first: "$doctor.avatar"
          },
          "designation": {
            $first: "$doctor.designation"
          },
          "qualificationId": {
            $first: "$qualify._id"
          },
          "completionYear": {
            $first: "$qualify.completionYear"
          },
          "degree": {
            $first: "$qualifyRes.degree"
          },
          "specializationId": {
            $first: "$special._id"
          },
          "specialization": {
            $first: "$special.shortName"
          },
          "fees": {
            $first: "$doctor.fees"
          },
          "gender": {
            $first: "$doctor.gender"
          },
          "city": "$city"
        }
      }
    ])

    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      console.log("error", error);
      response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    });
});

router.post("/get/by/gender", (req, res) => {
  var obj = {
    gender: req.body.gender,
    designation: "Doctor",
    isActivate: "Active",
    status: {
      $ne: "deleted"
    }
  }
  obj.gender == "" ? delete obj.gender : obj.gender;
  console.log("==>>", obj)
  user.aggregate([{
        $match: obj
      },
      {
        $lookup: {
          from: "doctorsqualifications",
          localField: "_id",
          foreignField: "doctorId",
          as: "qualify"
        }
      },
      {
        $lookup: {
          from: "qualifications",
          localField: "qualify.qualificationId",
          foreignField: "_id",
          as: "qualifyRes",
        },
      },
      {
        $lookup: {
          from: "locations",
          localField: "_id",
          foreignField: "doctorId",
          as: "locations",
        },
      },
      {
        $lookup: {
          from: "doctorsspecializations",
          localField: "_id",
          foreignField: "doctorId",
          as: "specialRes"
        }
      },
      {
        $lookup: {
          from: "specializations",
          localField: "specialRes.specializationId",
          foreignField: "_id",
          as: "special",
        },
      },
      // {
      //   $group:{
      //     _id : "$_id",
      //     firstName:"$doctor.firstName",
      //     // lastName: "$doctor.lastName",
      //     // avatar: "$doctor.avatar",
      //     // designation:"$doctor.designation",
      //   }
      // }
      {
        $project: {
          "_id": "$_id",
          "doctorId": "$_id",
          "firstName": "$firstName",
          "lastName": "$lastName",
          "avatar": "$avatar",
          "designation": "$designation",
          "qualificationId": {
            $first: "$qualify._id"
          },
          "completionYear": {
            $first: "$qualify.completionYear"
          },
          "degree": {
            $first: "$qualifyRes.degree"
          },
          "specializationId": {
            $first: "$special._id"
          },
          "specialization": {
            $first: "$special.shortName"
          },
          "fees": "$fees",
          "gender": "$gender",
          "city": {
            $first: "$locations.city"
          },
        }
      }
    ])

    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      console.log("error", error);
      response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    });
});


router.post("/get/doctor/fees", (req, res) => {
  user.aggregate([{
        $match: {
          $and: [{
              designation: "Doctor"
            },
            {
              fees: {
                $lte: req.body.fees
              }
            },
            {
              isActivate: "Active",
            },
            {status: {
              $ne: "deleted"
            }}
          ]
        }
      },
      {
        $lookup: {
          from: "doctorsqualifications",
          localField: "_id",
          foreignField: "doctorId",
          as: "qualify"
        }
      },
      {
        $lookup: {
          from: "qualifications",
          localField: "qualify.qualificationId",
          foreignField: "_id",
          as: "qualifyRes",
        },
      },
      {
        $lookup: {
          from: "locations",
          localField: "_id",
          foreignField: "doctorId",
          as: "locations",
        },
      },
      {
        $lookup: {
          from: "doctorsspecializations",
          localField: "_id",
          foreignField: "doctorId",
          as: "specialRes"
        }
      },
      {
        $lookup: {
          from: "specializations",
          localField: "specialRes.specializationId",
          foreignField: "_id",
          as: "special",
        },
      },
      // {
      //   $group:{
      //     _id : "$_id",
      //     firstName:"$doctor.firstName",
      //     // lastName: "$doctor.lastName",
      //     // avatar: "$doctor.avatar",
      //     // designation:"$doctor.designation",
      //   }
      // }
      {
        $project: {
          "_id": "$_id",
          "doctorId": "$_id",
          "firstName": "$firstName",
          "lastName": "$lastName",
          "avatar": "$avatar",
          "designation": "$designation",
          "qualificationId": {
            $first: "$qualify._id"
          },
          "completionYear": {
            $first: "$qualify.completionYear"
          },
          "degree": {
            $first: "$qualifyRes.degree"
          },
          "specializationId": {
            $first: "$special._id"
          },
          "specialization": {
            $first: "$special.shortName"
          },
          "fees": "$fees",
          "gender": "$gender",
          "city": {
            $first: "$locations.city"
          },
        }
      }
    ])

    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      console.log("error", error);
      response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    });
});

router.get("/get/doctors", (req, res) => {
  user.aggregate([{
        $match: {
          designation: "Doctor"
        }
      },
      {
        $lookup: {
          from: "doctorsqualifications",
          localField: "_id",
          foreignField: "doctorId",
          as: "qualify"
        }
      },
      {
        $lookup: {
          from: "qualifications",
          localField: "qualify.qualificationId",
          foreignField: "_id",
          as: "qualifyRes",
        },
      },
      {
        $lookup: {
          from: "locations",
          localField: "_id",
          foreignField: "doctorId",
          as: "locations",
        },
      },
      {
        $lookup: {
          from: "doctorsspecializations",
          localField: "_id",
          foreignField: "doctorId",
          as: "specialRes"
        }
      },
      {
        $lookup: {
          from: "specializations",
          localField: "specialRes.specializationId",
          foreignField: "_id",
          as: "special",
        },
      },
      // {
      //   $group:{
      //     _id : "$_id",
      //     firstName:"$doctor.firstName",
      //     // lastName: "$doctor.lastName",
      //     // avatar: "$doctor.avatar",
      //     // designation:"$doctor.designation",
      //   }
      // }
      {
        $project: {
          "_id": "$_id",
          "doctorId": "$_id",
          "firstName": "$firstName",
          "lastName": "$lastName",
          "avatar": "$avatar",
          "designation": "$designation",
          "qualificationId": {
            $first: "$qualify._id"
          },
          "completionYear": {
            $first: "$qualify.completionYear"
          },
          "degree": {
            $first: "$qualifyRes.degree"
          },
          "specializationId": {
            $first: "$special._id"
          },
          "specialization": {
            $first: "$special.shortName"
          },
          "fees": "$fees",
          "gender": "$gender",
          "city": {
            $first: "$locations.city"
          },
        }
      }
    ])
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      console.log("error", error);
      response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    });
});

router.get("/getby/doctors/:id", (req, res) => {
  let ids = mongoose.Types.ObjectId(req.params.id);
  user.aggregate([{
        $match: {
          _id: ids
        }
      },
      {
        $lookup: {
          from: "doctorsqualifications",
          localField: "_id",
          foreignField: "doctorId",
          as: "qualify"
        }
      },
      {
        $lookup: {
          from: "qualifications",
          localField: "qualify.qualificationId",
          foreignField: "_id",
          as: "qualifyRes",
        },
      },
      {
        $lookup: {
          from: "locations",
          localField: "_id",
          foreignField: "doctorId",
          as: "locations",
        },
      },
      {
        $lookup: {
          from: "doctorsspecializations",
          localField: "_id",
          foreignField: "doctorId",
          as: "specialRes"
        }
      },
      {
        $lookup: {
          from: "specializations",
          localField: "specialRes.specializationId",
          foreignField: "_id",
          as: "special",
        },
      },
      {
        $project: {
          "_id": "$_id",
          "doctorDetails": "$$ROOT",
          "qualificationId": {
            $first: "$qualify._id"
          },
          "completionYear": {
            $first: "$qualify.completionYear"
          },
          "degree": {
            $first: "$qualifyRes.degree"
          },
          "specializationId": {
            $first: "$special._id"
          },
          "specialization": {
            $first: "$special.shortName"
          },
          "city": {
            $first: "$locations.city"
          },
        }
      }
    ])
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      console.log("error", error);
      response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    });
});


router.post("/get/doctor/online", (req, res) => {
  user.aggregate([{
        $match: {
          $and: [{
              designation: "Doctor"
            },
            {
              isOnline: req.body.online
            }
          ]
        }
      },
      {
        $lookup: {
          from: "doctorsqualifications",
          localField: "_id",
          foreignField: "doctorId",
          as: "qualify"
        }
      },
      {
        $lookup: {
          from: "qualifications",
          localField: "qualify.qualificationId",
          foreignField: "_id",
          as: "qualifyRes",
        },
      },
      {
        $lookup: {
          from: "locations",
          localField: "_id",
          foreignField: "doctorId",
          as: "locations",
        },
      },
      {
        $lookup: {
          from: "doctorsspecializations",
          localField: "_id",
          foreignField: "doctorId",
          as: "specialRes"
        }
      },
      {
        $lookup: {
          from: "specializations",
          localField: "specialRes.specializationId",
          foreignField: "_id",
          as: "special",
        },
      },
      // {
      //   $group:{
      //     _id : "$_id",
      //     firstName:"$doctor.firstName",
      //     // lastName: "$doctor.lastName",
      //     // avatar: "$doctor.avatar",
      //     // designation:"$doctor.designation",
      //   }
      // }
      {
        $project: {
          "_id": "$_id",
          "doctorId": "$_id",
          "firstName": "$firstName",
          "lastName": "$lastName",
          "avatar": "$avatar",
          "designation": "$designation",
          "qualificationId": {
            $first: "$qualify._id"
          },
          "completionYear": {
            $first: "$qualify.completionYear"
          },
          "degree": {
            $first: "$qualifyRes.degree"
          },
          "specializationId": {
            $first: "$special._id"
          },
          "specialization": {
            $first: "$special.shortName"
          },
          "fees": "$fees",
          "gender": "$gender",
          "city": {
            $first: "$locations.city"
          },
        }
      }
    ])

    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      console.log("error", error);
      response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    });
});

router.post("/get/doctor/fees/gender", (req, res) => {
  user.aggregate([{
        $match: {
          $and: [{
              designation: "Doctor"
            },
            {
              fees: {
                $lte: req.body.fees
              }
            },
            {
              gender: req.body.gender
            },
            {
              isActivate: "Active",
            },
            {status: {
              $ne: "deleted"
            }}
          ]
        }
      },
      {
        $lookup: {
          from: "doctorsqualifications",
          localField: "_id",
          foreignField: "doctorId",
          as: "qualify"
        }
      },
      {
        $lookup: {
          from: "qualifications",
          localField: "qualify.qualificationId",
          foreignField: "_id",
          as: "qualifyRes",
        },
      },
      {
        $lookup: {
          from: "locations",
          localField: "_id",
          foreignField: "doctorId",
          as: "locations",
        },
      },
      {
        $lookup: {
          from: "doctorsspecializations",
          localField: "_id",
          foreignField: "doctorId",
          as: "specialRes"
        }
      },
      {
        $lookup: {
          from: "specializations",
          localField: "specialRes.specializationId",
          foreignField: "_id",
          as: "special",
        },
      },
      // {
      //   $group:{
      //     _id : "$_id",
      //     firstName:"$doctor.firstName",
      //     // lastName: "$doctor.lastName",
      //     // avatar: "$doctor.avatar",
      //     // designation:"$doctor.designation",
      //   }
      // }
      {
        $project: {
          "_id": "$_id",
          "doctorId": "$_id",
          "firstName": "$firstName",
          "lastName": "$lastName",
          "avatar": "$avatar",
          "designation": "$designation",
          "qualificationId": {
            $first: "$qualify._id"
          },
          "completionYear": {
            $first: "$qualify.completionYear"
          },
          "degree": {
            $first: "$qualifyRes.degree"
          },
          "specializationId": {
            $first: "$special._id"
          },
          "specialization": {
            $first: "$special.shortName"
          },
          "fees": "$fees",
          "gender": "$gender",
          "city": {
            $first: "$locations.city"
          },
        }
      }
    ])

    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      console.log("error", error);
      response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    });
});

router.post("/get/locality/city", (req, res) => {
  var search = req.body.city
  Location.aggregate([{
        $match: {
          $and: [{
              city: {
                $regex: search,
                $options: "i",
              }
            },
            {
              status: {
                $ne: "deleted"
              }
            }
          ]
        }
      },
      {
        $group: {
          _id: "$locality"
        }
      }
      //       {
      //   $project: {
      //     "_id": "$_id",
      //     "doctorId": {
      //       $first: "$doctor._id"
      //     },
      //     "firstName": {
      //       $first: "$doctor.firstName"
      //     },
      //     "lastName": {
      //       $first: "$doctor.lastName"
      //     },
      //     "avatar": {
      //       $first: "$doctor.avatar"
      //     },
      //     "designation": {
      //       $first: "$doctor.designation"
      //     },
      //     "qualificationId": {
      //       $first: "$qualify._id"
      //     },
      //     "completionYear": {
      //       $first: "$qualify.completionYear"
      //     },
      //     "degree": {
      //       $first: "$qualifyRes.degree"
      //     },
      //     "specializationId": {
      //       $first: "$special._id"
      //     },
      //     "specialization": {
      //       $first: "$special.shortName"
      //     },
      //     "fees": {
      //       $first: "$doctor.fees"
      //     },
      //     "gender": {
      //       $first: "$doctor.gender"
      //     },
      //     "city": "$city"
      //   }
      // }
    ])

    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      console.log("error", error);
      response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    });
});
module.exports = router;