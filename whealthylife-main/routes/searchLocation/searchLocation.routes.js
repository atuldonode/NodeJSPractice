const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const log = require("../../helper/logger");
const searchLocation = mongoose.model("SearchLocation");
// let auth = require("../../helper/auth");
let _ = require("lodash");


router.post("/add", (req, res) => {
  log.debug("/api/searchLocation");
  crudController
    .add( searchLocation, req.body)
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});




router.get("/get/all", (req, res) => {
  crudController
    .getAll(searchLocation)
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});
 
router.get("/search/:city",(req,res)=>{
  var regex=new RegExp(req.params.city,'i');
  crudController
        .getBy(searchLocation,{city:regex})
        .then((resData)=>{
         response.successResponse(res,200,resData);
  })
  .catch((error)=>{
    log.error(error);
    response.errorResponse(res,500);
  });
});
 




// router.put("/edit/by/:id", (req, res) => {
//   crudController
//     .updateBy(Qualification, req.params.id, req.body)
//     .then((resData) => {
//       response.successResponse(res, 200, resData);
//     })
//     .catch((error) => {
//       log.error(error);
//       response.errorResponse(res, 500);
//     });
// });

// router.delete("/delete/by/:id", (req, res) => {
//   crudController
//     .delete(Qualification, req.params.id)
//     .then((resData) => {
//       response.successResponse(res, 200, resData);
//     })
//     .catch((error) => {
//       log.error(error);
//       response.errorResponse(res, 500);
//     });
// });

module.exports = router;