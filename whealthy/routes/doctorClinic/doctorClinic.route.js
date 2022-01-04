const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const doctorClinic = mongoose.model("doctorClinic");
let auth = require("../../helper/auth");

router.post("/add", auth, (req, res) => {
  log.debug("/api/doctorClinic");

  clinicIdArr = [];
 
  req.body.clinicName.forEach(e => {
    clinicIdArr.push(e.clinicId)
  });

  doctorClinic.find({$and:[{ clinicId: { $nin: clinicIdArr } }, { doctorId: req.userId } ]})
  .then(async(testData) => {

    // deleting the not selected clinic
    if(testData.length > 0){
      
      deleteCliArr = [];

      testData.forEach(d => {
        deleteCliArr.push(d.clinicId)
      })
  
      await doctorClinic.deleteMany({$and:[{ clinicId: { $in: deleteCliArr } }, { doctorId: req.userId } ]})
    }

    // adding and checking the extra selected clinic
    clinicIdArr.forEach(c => {

      doctorClinic.findOne({
        $and: [{
            clinicId: c
        }, {
          doctorId: req.userId
        }],
    })
        .then(async (resData) => {
            if (resData) {
              console.log("found data");
            } else {
                await crudController.add(doctorClinic, {clinicId: c, doctorId: req.userId})
            }
        })
        .catch((error) => {
            log.error("error", error);
            response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
    })

    response.successResponse(res, 200, "done");
   
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
});




router.get("/by/doctor", auth, (req, res) => {
  log.debug("/api/");
  crudController
    .getbySortByTwoPopulate(
      doctorClinic, {
        doctorId: req.userId
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

router.get("/by/clinic/:id", (req, res) => {
  log.debug("/api/");
  crudController
    .getbySortByTwoPopulate(
      doctorClinic, {
        clinicId: req.params.id
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


router.post("/byDoctor/ClinicImageList", (req, res) => {
  log.debug("/api/");

    doctorClinic.aggregate([{
      $match: {
        doctorId: mongoose.Types.ObjectId(req.body.doctorId),
        status: "active",
      },
    },
    {
      $lookup: {
          from: "clinicimages",
          localField: "clinicId",
          foreignField: "clinicId",
          as: "image",
      }
  },
    {
      $project: {
        "_id": "$_id",
        "clinicId": "$clinicId",
        "doctorId": "$doctorId",
        "images": "$image",
      },
    },
  ])
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});


module.exports = router;
