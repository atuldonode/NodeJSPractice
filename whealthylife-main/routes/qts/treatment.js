const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const log = require("../../helper/logger");
const Treatment = mongoose.model("Treatment");
let auth = require("../../helper/auth");
let _ = require("lodash");

router.get("/get/all", (req, res) => {
  crudController
    .getAll(Treatment)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/get/by/:id", (req, res) => {
  crudController
    .getBy(Treatment, { _id: req.params.id })
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/add", (req, res) => {
  crudController
    .add(Treatment, req.body)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.put("/edit/by/:id", (req, res) => {
  crudController
    .updateBy(Treatment, req.params.id, req.body)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.delete("/delete/by/:id", (req, res) => {
  crudController
    .delete(Treatment, req.params.id)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/search/treatmentByName", (req, res) => {
  log.debug("/api/searchTreatment");
  var search = req.body.search
  crudController
    .getBy(Treatment, {
      $or: [
          { fullName: { '$regex': search, $options: 'i' } },
          { shortName: { '$regex': search, $options: 'i' } }
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

router.post("/search/specializationId", (req, res) => {
  log.debug("/api/treatment/search/specializationId");
  var search = req.body.specializationId
  Treatment
        .find({
          specialitie: { $in: search },
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
