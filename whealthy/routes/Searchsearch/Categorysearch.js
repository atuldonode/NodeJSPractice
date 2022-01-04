
const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const Category = mongoose.model("Category");



router.post("/search/Category", (req, res) => { 
  log.debug("/api/search/Category");
  var categoryHeading = req.body.categoryHeading
  crudController
    .getBy(Category, {
      Category: {
        $regex: categoryHeading,
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