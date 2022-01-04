const router = require("express").Router();
const crudController = require("../../controllers/searchController/searchController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
var config = require("../../config.json");
const mongoose = require("mongoose");
const Doctor = mongoose.model("User");
const Clinics = mongoose.model("Clinic");
const Speciality = mongoose.model("Specialization");
const Symptom = mongoose.model("Symptoms");
const Lab = mongoose.model("Lab");
const Test = mongoose.model("TestMaster");
const AddProductAdmin = mongoose.model("AddProductAdmin");

router.post("/searchDoctorClinicHospital", (req, res) => {
  log.debug("/api/");
  crudController
    .getByfilterName(Doctor,Clinics,req.body.search, req.body.city)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/searchSpecialitySymptomsDoctorClinicHospital", (req, res) => {
    log.debug("/api/");
    crudController
      .searchBySpecialitySymptomDoctorClinic(Speciality,Symptom,Doctor,Clinics,req.body.search, req.body.city)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.post("/searchLabTest", (req, res) => {
    log.debug("/api/");
    crudController
      .searchLabTest(Lab,Test,req.body.search, req.body.city)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.post("/elastic/search", (req, res) => {
    log.debug("/api//elastic/search");

    Promise.all([
      Doctor.find({
        $or: [{
          firstName: {
              "$regex": req.body.search,
              $options: "i",
          }
      }, {
        lastName: {
              "$regex": req.body.search,
              $options: "i",
          }
      }],
      designation: "Doctor",
      isActivate: "Active",
          status: {
            $ne: "deleted"
          }
      }),
      AddProductAdmin.find({
        productName: {
              "$regex": req.body.search,
              $options: "i",
          },
          status: {
            $ne: "deleted"
          }
      }),
  ])
  .then((resData) => {
      var result = []
      result = result.concat(...resData)
      response.successResponse(res, 200, result);
  })
  .catch((error) => {
      log.error("error", error);
      response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
  });

  });
  

module.exports = router;
