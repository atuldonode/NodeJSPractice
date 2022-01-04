const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const Icon = mongoose.model("Icon");
let auth = require("../../helper/auth");

router.delete("/delete/:id", auth, (req, res) => {
    log.debug("/api/iconPhoto/delete");
    crudController
      .delete(Icon, req.params.id)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  module.exports = router;