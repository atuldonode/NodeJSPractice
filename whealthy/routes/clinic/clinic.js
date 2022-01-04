const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const clinicController = require("../../controllers/clinic/clinic");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const User = mongoose.model("User");
const Clinic = mongoose.model("Clinic");
const Location = mongoose.model("Location");
const clinicImage =  mongoose.model("clinicImage");

let auth = require("../../helper/auth");
let _ = require("lodash");

router.post("/add", (req, res) => {
  req.body["addedBy"] = req.userId
  log.debug("/api/clinic/add");

  req.body["uniqueID"] = "CL-"+ Date.now().toString().slice(-2) + uuidv4().slice(-6).toUpperCase();

  crudController
    .add(Clinic, req.body)
    .then(async(userData) => {


      imgArr = [];
      req.body.additionalImage.forEach(e => {
        imgArr.push({
          additionalImage: e,
          clinicId: userData._id
        })
      })
    
      await crudController.insertMultiple(clinicImage, imgArr)

      crudController.add(Location, req.body.location)
      .then((locData)=>{
        crudController.updateBy(Clinic, userData._id, {locationId: locData._id})
        .then((resData)=>{
          response.successResponse(res ,200 , resData)
        }).catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
      })
      .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500); 
    });
});

router.get("/get/clinicImage/:clinicId", (req, res) => {
  log.debug("/api/clinicImage");
  crudController
    .getBy(clinicImage, {clinicId: req.params.clinicId})
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.delete("/delete/clinicImage/by/:id", (req, res) => {
  log.debug("/api/clinicImage/delete");
  crudController
    .delete(clinicImage, req.params.id)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});


router.put("/update/by/:id", (req, res) => {
  log.debug("/api/");
  crudController.getOne(Clinic , {_id : req.params.id}).then((resData)=>{
    crudController
    .updateBy(Clinic, req.params.id, req.body)
    .then(async(userData) => {

      imgArr = [];
      req.body.additionalImage.forEach(e => {
        imgArr.push({
          additionalImage: e,
          clinicId: userData._id
        })
      })
    
      await crudController.insertMultiple(clinicImage, imgArr)

      crudController.updateBy(Location, userData.locationId, req.body.location)
      .then((locData)=>{
        response.successResponse(res ,200 , userData)
      }).catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
    }).catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
  }).catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});


router.get("/by/:id", (req, res) => {
  log.debug("/api/");
  crudController
    .getbySortByTwoPopulate(
      Clinic, {
        _id: req.params.id
      },
      "locationId"
    )
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});


router.get("/all", (req, res) => {
  log.debug("/api/");
  crudController
    .getAll(Clinic)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/by/doctor/:doctorId", (req, res) => {
  log.debug("/api/asdfghjkl", req.params.doctorId);
  clinicController
    .getByDoctor(req.params.doctorId)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.delete("/delete/by/:id", (req, res) => {
  log.debug("/api/");
  crudController
    .delete(Clinic, req.params.id)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/search", (req, res) => {
  log.debug("/api/searchClinic");
  var search = req.body.search
  crudController
    .getBy(Clinic, {
      $or: [
          { clinicName: { '$regex': search, $options: 'i' } },
          { legalName: { '$regex': search, $options: 'i' } },
          {uniqueID: { '$regex': search, $options: 'i' } }
      ]
  })
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/validate", (req, res) => {
  log.debug("/api/Clinic/validate");

  function isEmpty(str) {
    return (!str || str.length === 0 );
}

if (isEmpty(req.body.mobileNumber) ==  false){
  var mobile = req.body.mobileNumber;
}

if(isEmpty(req.body.email) == false){
  var email = req.body.email;
}
     
   Promise.all([
     Clinic.find({ 
       $or: [{mobileNumber: mobile}, {email: email}],
       designation: {$ne: "Admin"},
       mobileNumber: {$ne: null},
       email: {$ne: null}
    }), 
    User.find({ 
      $or: [{mobileNumber: mobile}, {email: email}],
      designation: {$ne: "Admin"},
      mobileNumber: {$ne: null},
      email: {$ne: null}
    })
  ])
    .then((userData) => {
      
     var data = "";
      if (userData[0].length === undefined || userData[0].length === 0 ){
        if(userData[1].length === undefined || userData[1].length === 0){
          data = "";
        }else{
          data = "DATA FOUND";
        }
      }else{
        data = "DATA FOUND";
      }
      response.successResponse(res, 200, data);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500); 
    });
});




module.exports = router;