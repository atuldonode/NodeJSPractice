
const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const subCategory = mongoose.model("subCategory");



router.post("/search/subCategory", (req, res) => { 
  log.debug("/api/search/subCategory");
  var subCategoryName = req.body.subCategoryName
  crudController
    .getBy(subCategory, {
      subCategory: {
        $regex: subCategoryName,
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
})
 
module.exports = router;