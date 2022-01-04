const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const mainCategory = mongoose.model("mainCategory");
let auth = require("../../helper/auth");

router.post("/add", auth, (req, res) => {
  log.debug("/api/mainCategory");
  crudController
    .add(mainCategory, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
}); 

router.get("/getAll", (req, res) => {
  log.debug("/api/mainCategory");
  crudController
    .getAll(mainCategory)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/get/:id", auth, (req, res) => {
  log.debug("/api/mainCategory");
  crudController
    .getOne(mainCategory, {_id: req.params.id})
    .then(async (testData) => {
     
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.put("/update/:id", auth, (req, res) => {
  log.debug("/api/mainCategory");
  crudController
    .updateBy(mainCategory, req.params.id, req.body)
    .then(async (userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});


router.delete("/delete/:id", auth, (req, res) => {
  log.debug("/api/mainCategory");
  crudController
    .delete(mainCategory, req.params.id)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});


module.exports = router;

