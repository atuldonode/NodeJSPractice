const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
let auth = require("../../helper/auth");
const DoctorProfileComment = mongoose.model("DoctorProfileComment");


router.post("/add", auth, (req, res) => {
    log.debug("/api/add/DoctorProfileComment");
    req.body["userId"] = req.userId
    crudController
      .add(DoctorProfileComment, req.body)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });


  router.post("/getAll", async (req, res) => {
    log.debug("/api/DoctorProfileComment");

    const page = 1; 
    const limit = 5;

    sendData = []; 
    ninData = [];


    if(req.body.userId !== undefined || null || ""){
       const rData = await DoctorProfileComment.find({
            doctorId: req.body.doctorId,
            userId : req.body.userId,
            status: {$ne: "deleted"}
          }).populate("userId");

          rData.forEach(e => {
            sendData.push(e)
          })
    }

    DoctorProfileComment.find({
        userId: {$ne: req.body.userId},
        doctorId: req.body.doctorId,
        status: {$ne: "deleted"}
      })
      .populate("userId")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({"rating": -1})
      .then(async(userData) => {


        userData.forEach(f => {
            sendData.push(f);
            ninData.push(f._id);
          })

       const exceptData = await DoctorProfileComment.find({
            _id: { $nin: ninData },
            userId: {$ne: req.body.userId},
            doctorId: req.body.doctorId,
            status: {$ne: "deleted"}
          })
          .populate("userId");

          exceptData.forEach(f => {
            sendData.push(f);
          })

        response.successResponse(res, 200, sendData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });  


  router.delete("/delete/:id", auth, (req, res) => {
    log.debug("/api/DoctorProfileComment");
    crudController
      .delete(DoctorProfileComment, req.params.id)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.put("/update/:id", auth, (req, res) => {
    log.debug("/api/:id");
    crudController
      .updateBy(DoctorProfileComment, req.params.id, req.body)
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });

  router.post("/reply", (req, res) => {
    log.debug("/api/");
  
    DoctorProfileComment.aggregate([{
        $match: {
          doctorId: mongoose.Types.ObjectId(req.body.doctorId),
          status: "active",
        },
      },
    {
                $lookup: {
                  from: "commentreplies",
                  let: {
                    "commentId": "$_id"
                  },
                  as: "likes",
                  pipeline: [{
                    $match: {
                      "status": "active",
                      $expr: {
                        $or: [{
                            $eq: ["$commentId", "$$commentId"]
                        }]
                      },
                    },
                  }, ],
                },
              },
      {
        $project: {
          "_id": "$_id",
          "doctorId": "$doctorId",
          "reply": "$reply",
        },
      },
    ])
      .then((userData) => {
        response.successResponse(res, 200, userData);
      })
      .catch((error) => {
        log.error(error);
        response.errorResponse(res, 500);
      });
  });
  

module.exports = router;