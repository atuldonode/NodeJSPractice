
const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const Article = mongoose.model("Article");



router.post("/search", (req, res) => { 
  log.debug("/api/search/article");
  var title = req.body.title
  crudController
    .getBy(Article, {
        Article: {
        $regex: title,
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