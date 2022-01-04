const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const Procedure = mongoose.model("Procedure");
let auth = require("../../helper/auth");

router.post("/add", auth,  (req, res) => {
  log.debug("/api/");
  
  req.body.forEach(function(e){
    e["doctorId"] = req.userId;
  });

  Procedure.insertMany(req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/getBy/doctorId", auth,  (req, res) => {
  log.debug("/api/");
  crudController
    .getBy(Procedure , {doctorId : req.userId})
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/get/:id", auth,  (req, res) => {
  log.debug("/api/");
  crudController
    .getOne(Procedure, { _id: req.params.id })
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.put("/update/:id", auth,  (req, res) => {
  log.debug("/api/:id");
  crudController
    .updateBy(Procedure, req.params.id, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.delete("/delete/:id", auth, (req, res) => {
  log.debug("/api/");
  crudController
    .delete(Procedure, req.params.id)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/search/procedureByName", (req, res) => {
  log.debug("/api/searchProcedure");
  var search = req.body.search
  crudController
    .getBy(Procedure, {
      procedureName: {
        "$regex": search,
        $options: "i",
      }
    })
    .then((resData) => {
     
        var newData = [];
        resData.forEach(function(value) {
            if (newData.indexOf(value.procedureName) === -1) {
              newData.push(value.procedureName);
            }
        });
      
      response.successResponse(res, 200, newData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/getallunique",  (req, res) => {
  log.debug("/api/");
  const data = Procedure.distinct( "procedureName", {
    status: {
      $ne: "deleted"
    }
  },
  (function(err, docs){
       if(err){
        log.error(error);
        response.errorResponse(res, 500);
       }
       if(docs){  
           response.successResponse(res, 200, docs);
       }
  }) );
});



module.exports = router;
