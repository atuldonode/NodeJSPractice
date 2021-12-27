const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const ClinicFoam = mongoose.model("ClinicFoam");
const certificateUrl = mongoose.model("certificateUrl");
let auth = require("../../helper/auth");

router.post("/add", (req, res) => {
  log.debug("/api/ClinicFoam");
  crudController
    .add(ClinicFoam, req.body)
    .then(async(testData) => {
      
      if (req.body.certificateUrl.length > 0){
        var certificateArr = []
      req.body.certificateUrl.forEach(element => {
        certificateArr.push({
          certificateUrl:element,
          clinicFoamId : testData._id
        })
      });
      await crudController.insertMultiple(certificateUrl  , certificateArr)
      }

      if (req.body.Images.length > 0){
        var imageArr = []
      req.body.Images.forEach(element => {
        imageArr.push({
          ImagesUrl:element,
          clinicFoamId : testData._id
        })
      });
      await crudController.insertMultiple(certificateUrl  , imageArr)
      }
      
     const data =   await crudController.getBy(certificateUrl  , {clinicFoamId : testData._id})
      response.successResponse(res, 200, {testData , data});
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});


router.get("/getall", (req, res) => {
    log.debug("/api/ClinicFoam");
    crudController
      .getAll(ClinicFoam)
      .then((testData) => {
        response.successResponse(res, 200, testData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });


router.get("/get/:id", (req, res) => {
  log.debug("/api/ClinicFoam");
  crudController
    .getOne(ClinicFoam, { _id: req.params.id })
    .then(async(testData) => {
      const data =   await crudController.getBy(certificateUrl  , {clinicFoamId : req.params.id})
      response.successResponse(res, 200, {testData , data});
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});


router.put("/update/:id", (req, res) => {
  log.debug("/api/ClinicFoam");
  crudController
    .updateBy(ClinicFoam, req.params.id, req.body)
    .then(async(userData) => {
     response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.put("/update/certificateUrl/:id", (req, res) => {
  log.debug("/api/ClinicFoam");
  crudController
    .updateBy(certificateUrl, req.params.id, req.body)
    .then(async(userData) => {
     response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});


router.delete("/delete/:id", (req, res) => {
  log.debug("/api/ClinicFoam");
  crudController
    .delete(ClinicFoam, req.params.id)
    .then(async(userData) => {
      await certificateUrl.updateMany({clinicFoamId : req.params.id}, {status: "deleted"});
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.delete("/delete/certificateUrl/:id", (req, res) => {
  log.debug("/api/certificateUrl/delete");
  crudController
    .delete(certificateUrl, req.params.id)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/search/clinicFoam", (req, res) => {
  log.debug("/api/clinicFoam/search");
  var search = req.body.search
  crudController
    .getBy(ClinicFoam, {
      $or: [
          { businessName: { '$regex': search, $options: 'i' } },
          { name: { '$regex': search, $options: 'i' } }
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

router.post("/getby/businessType", (req, res) => {
  log.debug("/api/ClinicFoam/businessType");
  ClinicFoam
        .find({
          businessType: req.body.search,
          status: {
            $ne: "deleted"
          }
        })
        .then((resData) => {
          response.successResponse(res, 200, resData);
        })
        .catch((error) => {
          log.error(error);
          response.errorResponse(res, 500);
        });
});




module.exports = router;
