const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const amenities = mongoose.model("amenities");
let auth = require("../../helper/auth");

router.post("/add", (req, res) => {
  log.debug("/api/add/amenities");
  crudController
    .add(amenities, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});


router.get("/getall", (req, res) => {
    log.debug("/api/amenities");
    crudController
      .getAll(amenities)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });


router.get("/get/:id", (req, res) => {
  log.debug("/api/amenities");
  crudController
    .getOne(amenities, { _id: req.params.id })
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.put("/update/:id", (req, res) => {
  log.debug("/api/:id/amenities");
  crudController
    .updateBy(amenities, req.params.id, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.delete("/delete/:id", (req, res) => {
  log.debug("/api/amenities");
  crudController
    .delete(amenities, req.params.id)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});


router.post("/search/amenities", (req, res) => {
    log.debug("/api/amenities");
    var search = req.body.search
    crudController
      .getBy(amenities, {
        name: {
          "$regex": search,
          $options: "i",
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
