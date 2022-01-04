
const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const mainCategory = mongoose.model("mainCategory");



router.post("/search/mainCategory", (req, res) => { 
  log.debug("/api/search/mainCategory");
  var categoryName = req.body.categoryName
  crudController
    .getBy(mainCategory, {
        mainCategory: {
        $regex: categoryName,
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