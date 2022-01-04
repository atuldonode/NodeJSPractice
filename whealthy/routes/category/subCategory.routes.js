const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
let auth = require("../../helper/auth");
const SubCategory = mongoose.model("subCategory");

router.post("/add", auth, (req, res) => {
  log.debug("/api/Category");
  crudController
    .add(SubCategory, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
}); 

router.get("/getAll", (req, res) => {
  log.debug("/api/SubCategory");
  crudController
    .getAll(SubCategory)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/get/:id", auth, (req, res) => {
  log.debug("/api/SubCategory");
  crudController
    .getOne(SubCategory, {_id: req.params.id})
    .then(async (testData) => {
     
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.put("/update/:id",auth, (req, res) => {
  log.debug("/api/SubCategory");
  crudController
    .updateBy(SubCategory, req.params.id, req.body)
    .then(async (userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});


router.delete("/delete/:id",auth, (req, res) => {
  log.debug("/api/SubCategory");
  crudController
    .delete(SubCategory, req.params.id)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});


module.exports = router;
