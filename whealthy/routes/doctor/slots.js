const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const slotController = require("../../controllers/doctor/slot");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const doctorController = require("../../controllers/doctor/doctor");
const log = require("../../helper/logger");
const Slots = mongoose.model("Slots");
const doctorClinic = mongoose.model("doctorClinic");
let auth = require("../../helper/auth");
let _ = require("lodash");
var moment = require("moment");
const {split} = require("lodash");
const notification = require("../../helper/notification");


router.post("/", (req, res) => {
  var userId;
  if (req.body.userId) {
    userId = req.body.userId;
  } else {
    userId = req.userId;
  }
  var arr = [];
  req.body.slotsArray.forEach(element => {
    console.log("🚀 ~ file: slots.js ~ line 23 ~ router.post ~ element", element)

    let Mfrm = moment(element.morningSlot.from).format("HH:mm:ss.SSS[Z]")
    let Mt = moment(element.morningSlot.to).format("HH:mm:ss.SSS[Z]")
    let Afrm = moment(element.afternoonSlot.from).format("HH:mm:ss.SSS[Z]")
    let At = moment(element.afternoonSlot.to).format("HH:mm:ss.SSS[Z]")
    let Efrm = moment(element.eveningSlot.from).format("HH:mm:ss.SSS[Z]")
    let Et = moment(element.eveningSlot.to).format("HH:mm:ss.SSS[Z]")
    let Nfrm = moment(element.nightSlot.from).format("HH:mm:ss.SSS[Z]")
    let Nt = moment(element.nightSlot.to).format("HH:mm:ss.SSS[Z]")
    arr.push({
      userId: userId,
      day: element.day,
      morningSlot: {
        from: element.morningSlot.from,
        todt: Mt,
        fromdt: Mfrm,
        to: element.morningSlot.to
      },
      afternoonSlot: {
        from: element.afternoonSlot.from,
        todt: At,
        fromdt: Afrm,
        to: element.afternoonSlot.to
      },
      eveningSlot: {
        from: element.eveningSlot.from,
        todt: Et,
        fromdt: Efrm,
        to: element.eveningSlot.to
      },
      nightSlot: {
        from: element.nightSlot.from,
        todt: Nt,
        fromdt: Nfrm,
        to: element.nightSlot.to
      }
    })
  });
  crudController
    .insertMultiple(Slots, arr)
    .then((slotData) => {
      response.successResponse(res, 200, slotData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/validate/morningSlot", auth, (req, res) => {
  log.debug("/api/profile/details");
  var userId;
  if (req.body.userId) {
    userId = req.body.userId;
  } else {
    userId = req.userId;
  }
  crudController
    .getBy(Slots, {
      userId: userId,
      day: req.body.day,
      $or: [{
          $and: [{
            "morningSlot.todt": {
              $gte: "1111-11-11T" + req.body.from + ":00.000Z"
            },
          }, {
            "morningSlot.todt": {
              $lte: "1111-11-11T" + req.body.to + ":00.000Z"
            },
          }],
        },
        {
          $and: [{
              "morningSlot.fromdt": {
                $gte: "1111-11-11T" + req.body.from + ":00.000Z"
              },
            },
            {
              "morningSlot.fromdt": {
                $lte: "1111-11-11T" + req.body.to + ":00.000Z"
              },
            }
          ]
        }, {
          $and: [{
              "morningSlot.fromdt": {
                $lte: "1111-11-11T" + req.body.from + ":00.000Z"
              },
            },
            {
              "morningSlot.todt": {
                $gte: "1111-11-11T" + req.body.to + ":00.000Z"
              },
            }
          ]
        }
      ]
    })
    .then((slotData) => {
      var resp = true
      if (slotData[0]) {
        resp = false
        response.successResponse(res, 200, {
          slotData,
          resp
        });
      } else {
        response.successResponse(res, 200, resp)
      }
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/validate/afternoonSlot", auth, (req, res) => {
  log.debug("/api/profile/details");
  var userId;
  if (req.body.userId) {
    userId = req.body.userId;
  } else {
    userId = req.userId;
  }
  crudController
    .getBy(Slots, {
      userId: userId,
      day: req.body.day,
      $or: [{
          $and: [{
            "afternoonSlot.todt": {
              $gte: "1111-11-11T" + req.body.from + ":00.000Z"
            },
          }, {
            "afternoonSlot.todt": {
              $lte: "1111-11-11T" + req.body.to + ":00.000Z"
            },
          }],
        },
        {
          $and: [{
              "afternoonSlot.fromdt": {
                $gte: "1111-11-11T" + req.body.from + ":00.000Z"
              },
            },
            {
              "afternoonSlot.fromdt": {
                $lte: "1111-11-11T" + req.body.to + ":00.000Z"
              },
            }
          ]
        }, {
          $and: [{
              "afternoonSlot.fromdt": {
                $lte: "1111-11-11T" + req.body.from + ":00.000Z"
              },
            },
            {
              "afternoonSlot.todt": {
                $gte: "1111-11-11T" + req.body.to + ":00.000Z"
              },
            }
          ]
        }
      ]
    })
    .then((slotData) => {
      var resp = true
      if (slotData[0]) {
        resp = false
        response.successResponse(res, 200, {
          slotData,
          resp
        });
      } else {
        response.successResponse(res, 200, resp)
      }
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
})

router.post("/validate/eveningSlot", auth, (req, res) => {
  log.debug("/api/profile/details");
  var userId;
  if (req.body.userId) {
    userId = req.body.userId;
  } else {
    userId = req.userId;
  }
  crudController
    .getBy(Slots, {
      userId: userId,
      day: req.body.day,
      $or: [{
          $and: [{
            "eveningSlot.todt": {
              $gte: "1111-11-11T" + req.body.from + ":00.000Z"
            },
          }, {
            "eveningSlot.todt": {
              $lte: "1111-11-11T" + req.body.to + ":00.000Z"
            },
          }],
        },
        {
          $and: [{
              "eveningSlot.fromdt": {
                $gte: "1111-11-11T" + req.body.from + ":00.000Z"
              },
            },
            {
              "eveningSlot.fromdt": {
                $lte: "1111-11-11T" + req.body.to + ":00.000Z"
              },
            }
          ]
        }, {
          $and: [{
              "eveningSlot.fromdt": {
                $lte: "1111-11-11T" + req.body.from + ":00.000Z"
              },
            },
            {
              "eveningSlot.todt": {
                $gte: "1111-11-11T" + req.body.to + ":00.000Z"
              },
            }
          ]
        }
      ]
    })
    .then((slotData) => {
      var resp = true
      if (slotData[0]) {
        resp = false
        response.successResponse(res, 200, {
          slotData,
          resp
        });
      } else {
        response.successResponse(res, 200, resp)
      }
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
})

router.post("/validate/nightSlot", auth, (req, res) => {
  log.debug("/api/profile/details");
  var userId;
  if (req.body.userId) {
    userId = req.body.userId;
  } else {
    userId = req.userId;
  }
  crudController
    .getBy(Slots, {
      userId: userId,
      day: req.body.day,
      $or: [{
          $and: [{
            "nightSlot.todt": {
              $gte: "1111-11-11T" + req.body.from + ":00.000Z"
            },
          }, {
            "nightSlot.todt": {
              $lte: "1111-11-11T" + req.body.to + ":00.000Z"
            },
          }],
        },
        {
          $and: [{
              "nightSlot.fromdt": {
                $gte: "1111-11-11T" + req.body.from + ":00.000Z"
              },
            },
            {
              "nightSlot.fromdt": {
                $lte: "1111-11-11T" + req.body.to + ":00.000Z"
              },
            }
          ]
        }, {
          $and: [{
              "nightSlot.fromdt": {
                $lte: "1111-11-11T" + req.body.from + ":00.000Z"
              },
            },
            {
              "nightSlot.todt": {
                $gte: "1111-11-11T" + req.body.to + ":00.000Z"
              },
            }
          ]
        }
      ]
    })
    .then((slotData) => {
      var resp = true
      if (slotData[0]) {
        resp = false
        response.successResponse(res, 200, {
          slotData,
          resp
        });
      } else {
        response.successResponse(res, 200, resp)
      }
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
})

router.get("/by/:userId", (req, res) => {
  log.debug("/api/get/slots");
  crudController
    .getBy(Slots, {
      userId: req.params.userId
    })
    .then((slotData) => {
      if (slotData) {
        response.successResponse(res, 200, slotData);
      } else {
        response.successResponse(res, 200, "true")
      }
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/:userId", auth, (req, res) => {
  log.debug("/api/profile/details");
  crudController
    .getBy(Slots, {
      userId: req.params.userId
    })
    .then((slotData) => {
      response.successResponse(res, 200, slotData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/time/:doctorId",  (req, res) => {
  log.debug("/api/profile/details");

  crudController
  .getBytime(Slots, req.params.doctorId,req.body.dayAndDate)
  .then((slotData) => {
    response.successResponse(res, 200, slotData);
  })
  .catch((error) => {
    log.error(error);
    response.errorResponse(res, 500);
  });
});

router.get("/:id", auth, (req, res) => {
  log.debug("/api/profile/details");
  crudController
    .getSingleRecordByPopulate(Slots, {
      _id: req.params.id
    }, "userId")
    .then((slotData) => {
      response.successResponse(res, 200, slotData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.put("/by/:id", (req, res) => {
  log.debug("/api/profile/details");
  crudController
    .updateBy(Slots, req.params.id, req.body)
    .then((slotData) => {
      response.successResponse(res, 200, slotData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/getSlot/day/date", (req, res) => {
  log.debug("/api/getSlot/day/date");
  crudController
    .getBy(Slots, {
      _id: req.params.id
    }, "userId")
    .then((slotData) => {
      response.successResponse(res, 200, slotData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});


router.post("/add", auth, (req, res) => {
  log.debug("/api/slot/add");
  var userId;
  if (req.body.userId) {
    userId = req.body.userId;
  } else {
    userId = req.userId;
  }

  deleteDayDateArr = [];
  req.body.dayAndDate.forEach(d => {
      deleteDayDateArr.push(d)
  })


  var arr = [];
  Slots.deleteMany({
    $and:[
      { dayAndDate: { $in: deleteDayDateArr } },
      {clinicId: req.body.clinicId},
      { doctorId: userId } 
    ]
  }).then((delData) => {
    req.body.dayAndDate.forEach(d => {
      req.body.slotsArray.forEach(element => {
        arr.push({
          doctorId: userId,
          dayAndDate: d,
          week: moment(d, 'ddd DD MM YYYY').format("ddd"),
          clinicId: req.body.clinicId,
          revisited: element.revisited,
          startTime: element.startTime,
          endTime: element.endTime,
          duration: req.body.duration
        })
      });
  })    
    crudController
      .insertMultiple(Slots, arr)
      .then((slotData) => {

        response.successResponse(res, 200, slotData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  }).catch((error) => {
    log.error(error);
    response.errorResponse(res, 500);
  })
});

router.post("/getBy/week", (req, res) => {
  log.debug("/api/Slots/week");

      Slots.distinct( "doctorId", {$and:[{ week: { $in: req.body.day } }, {status: {$ne: "deleted"}} ]},
      (function(err, docs){
        if(err){
          log.error(error);
          response.errorResponse(res, 500);
         }
           if(docs){  
            
            User.find({$and:[{ _id: { $in: docs } }, {status: {$ne: "deleted"}} ]})
            .then((testData) => {
              response.successResponse(res, 200, testData);
            })
            .catch((error) => {
              log.error(error);
              response.errorResponse(res, 500);
             });
           }
      }) );
    
});

router.post("/getSlotBy", auth, (req, res) => {
  log.debug("/api/getSlot/day/date/doctorId");
  var obj = {
    $and: [{
        dayAndDate: req.body.dayAndDate
      },
      {
        doctorId: req.userId
      },
      {
        clinicId: req.body.clinicId 
      }
    ]
  }
  console.log("obj", obj)
  crudController
    .getBy(Slots, obj)
    .then((slotData) => {
      response.successResponse(res, 200, slotData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});


router.get("/by/doctorClinic/:doctorId", (req, res) => {
  log.debug("/api/doctorClinic");
  crudController
    .getbySortByTwoPopulate(
      doctorClinic, {
        doctorId: mongoose.Types.ObjectId(req.params.doctorId)
      },
      "doctorId",
      "clinicId"
    )
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});


router.post("/add/same/slots",auth, (req, res) => {
  log.debug("/api/add/same/slots")
  var userId;
  if (req.body.userId) {
    userId = req.body.userId;
  } else {
    userId = req.userId;
  }


  var arr = [];
  Slots.find({
    _id: {
      $in: req.body.idArray
    }
  }, {
    "startTime": 1,
    "endTime": 1,
    "revisited": 1
  }).then((slotData) => {
    var arr2 = [];
    req.body.mainArray.forEach(element => {
      slotData.forEach(ele => {
        arr2.push({
          doctorId: userId,
          dayAndDate: element,
          revisited: ele.revisited,
          startTime: ele.startTime,
          endTime: ele.endTime
        })
      });
    });
    var deleteObj = {
      $and: [{
          doctorId: userId
        },
        {
          dayAndDate: {
            $in: arr2.dayAndDate
          }
        }
      ]
    }
    var deleteObj = []
    for (let i = 0; i < req.body.mainArray.length; i++) {
      deleteObj[i] = {
        doctorId: req.userId,
        dayAndDate: req.body.mainArray[i]
      }
    }

    const resObj = {
      ...deleteObj
    }

    console.log(deleteObj.doctorId)
    // var resObj = Object.assign({}, deleteObj);
    crudController.getBy(Slots, resObj).then((delData) => {
      console.log("=====>>>", delData)
      // crudController
      //   .insertMultiple(Slots, arr2)
      //   .then((slotData) => {
      response.successResponse(res, 200, delData);
      //   })
      //   .catch((error) => {
      //     log.error(error);
      //     response.errorResponse(res, 500);
      //   });
    }).catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
  }).catch((error) => {
    log.error(error);
    response.errorResponse(res, 500);
  })
});


router.post("/Slot/dateAndDay", (req, res) => {
  log.debug("/api/slot/dateAndDay");
  
    Slots.find({
      dayAndDate: req.body.dayAndDate,
      doctorId: req.body.doctorId,
      clinicId: req.body.clinicId
    })
    .then( async (slotData) => {

      if(slotData.length === 0){

        let newDate = "";

        newDate = moment(req.body.dayAndDate, "ddd, DD-MM-YYYY").add(1, 'days').format('ddd, DD-MM-YYYY');

        const findDate = async function (d){
          const rData = await Slots.find({
            dayAndDate: d,
            doctorId: req.body.doctorId,
            clinicId: req.body.clinicId
          });

          if (rData.length !== 0 ){
            response.successResponse(res, 200, rData[0].dayAndDate);
          }
          else{
           const nan =  moment(newDate, "ddd, DD-MM-YYYY").add(1, 'days').format('ddd, DD-MM-YYYY')
           newDate = nan;
            if(nan === "Invalid date"){
              response.successResponse(res, 500, "Invalid Date or Day");
            }else{
              findDate(nan);
            }
          }
        }

        findDate(newDate);

      }else{
        response.successResponse(res, 200, req.body.dayAndDate);
      }
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});



router.post("/get/time/intervals", (req, res) => {
  log.debug("/api/get/time/intervals");

  const splitTime = (startTime, endTime, interval) => {
    const result = [startTime.toString()];
    let time = startTime.add(interval, 'm');
    while (time.isBetween(startTime, endTime, undefined, [])) {
      result.push(time.toString());
      time = time.add(interval, 'm');
    }
    return result;
  }
  
  const obj = {
    dayAndDate: req.body.dayAndDate,
    doctorId: req.body.doctorId,
    clinicId: req.body.clinicId
  }

  crudController
  Slots.find(obj)
  .then((testData) => {
    console.log(testData);

    // For printing out the intervals 
    var morning = [];
    var afternoon = [];
    var evening = [];
    var night = [];
    var calenderSlots = [];

  
    testData.forEach(e => {
      var s1, s2, s3, s4, t1, t2, t3, t4, t5, t6

    console.log(e.startTime);
    s1 = e.startTime.split(":")
    t1 = s1[0]
    s2 = s1[1].split(" ")
    t3 = s2[1]
    t2 = s2[0]
    s3 = e.endTime.split(":")
    t4 = s3[0]
    s4 = s3[1].split(" ")
    t5 = s4[0]
    t6 = s4[1]
    console.log(t1, t2, t3, t4, t5, t6)
 

    const interval = e.duration;
    const startTime = moment(t1 + ":" + t2 + t3, ["h:mm A"]);
    console.log("startTime", startTime)
    const endTime = moment(t4 + ":" + t5 + t6, ["h:mm A"]);
    console.log("endTime", endTime)
    console.log("=====>>>>>>", startTime, endTime, interval)
    const timeSlices = splitTime(startTime, endTime, interval);
    console.log(timeSlices);

    

    for (let i = 0; i < timeSlices.length; i++) {

      const timeHour = moment(timeSlices[i], 'ddd MMM DD YYYY HH:mm:ss ZZ').format("HH");

      if (timeHour < 12){
        morning.push(moment(timeSlices[i], 'ddd MMM DD YYYY HH:mm:ss ZZ').format("hh:mm A"));
      }if(timeHour >= 12 && timeHour < 16){
        afternoon.push(moment(timeSlices[i], 'ddd MMM DD YYYY HH:mm:ss ZZ').format("hh:mm A"));
      }if(timeHour >= 16 && timeHour < 20){
        evening.push(moment(timeSlices[i], 'ddd MMM DD YYYY HH:mm:ss ZZ').format("hh:mm A"));
      }if(timeHour >= 20 && timeHour < 23){
        night.push(moment(timeSlices[i], 'ddd MMM DD YYYY HH:mm:ss ZZ').format("hh:mm A"));
      }
    }

    for (let i = 0; i < timeSlices.length; i++) {
      calenderSlots.push(moment(timeSlices[i], 'ddd MMM DD YYYY HH:mm:ss ZZ').format("hh:mm A"));
    }

  });

    response.successResponse(res, 200, {
      testData,
      morning,
      afternoon,
      evening,
      night,
      calenderSlots
    })
  }).catch((error) => {
    response.errorMsgResponse(res, 301, error)
  })
})

module.exports = router;