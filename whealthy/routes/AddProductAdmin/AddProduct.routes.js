const router = require("express").Router();
const crudController = require("../../controllers/commonController/crudController");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const AddProductAdmin = mongoose.model("AddProductAdmin");
const Icon = mongoose.model("Icon");
const csv = require("csv-parse");
const fs = require("fs");
let auth = require("../../helper/auth");

router.post("/add", (req, res) => {
  log.debug("/api/AddProductAdmin");
  crudController
    .add(AddProductAdmin, req.body)
    .then(async (testData) => {
      var arrIcon = []
      req.body.iconArray.forEach(element => {
        arrIcon.push({
          fileURL: element,
          addProductAdminId: testData._id
        })
      });
      await crudController.insertMultiple(Icon, arrIcon)
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});


router.post("/csv", (req, res) => {
  var payload = [];
  var parser = csv({
      columns: true,
    },
    function (err, records) {
      records.forEach((element) => {
        let dataPayload = {
          additionalDetails: element.additionalDetails,
          attachment: element.attachment,
          isFeatureProduct: element.isFeatureProduct,
          listPrice: element.listPrice,
          discount: element.discount,
          mainProductImage: element.mainProductImage,
          minimumOrderAmmount: element.minimumOrderAmmount,
          minimumQuantity: element.minimumQuantity,
          productBrand: element.productBrand,
          productDetails: element.productDetails,
          productName: element.productName,
          stock: element.stock,
          noOfTablet: element.noOfTablet,
          noOfStrips: element.noOfStrips,
          alternateName: element.alternateName,
          weight: element.weight,
          yourPrice: element.yourPrice,
          benefits: element.benefits,
          storage: element.storage,
          sideEffect: element.sideEffect,
          howtoUse: element.howtoUse,
          safetyadvice: element.safetyadvice,
          directionOfuse: element.directionOfuse,
          benifits: element.benifits,
        };
        payload.push({
          ...dataPayload,
        });
      });
      AddProductAdmin.insertMany(payload)
        .then((resData) => {
          response.successResponse(res, 200, resData);
        })
        .catch((error) => {
          console.log("error", error);
          response.errorMsgResponse(res, 500);
        });
    }
  );
  // var foldername = (__dirname, "../../../", "public/uploads/");
  // var firl = req.body.file.replace("http://15.207.7.56:3322/static/", "");
  fs.createReadStream(req.body.file).pipe(parser);
});

router.get("/getall", auth, (req, res) => {
  log.debug("/api/AddProductAdmin");
  crudController
    .getAll(AddProductAdmin)
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/getAllData", (req, res) => {
  log.debug("/api/AddProductAdmin");
  crudController
    .getAll(AddProductAdmin)
    .then((testData) => {
      response.successResponse(res, 200, testData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/get/:id", auth, (req, res) => {
  log.debug("/api/AddProductAdmin");
  crudController
    .getOne(AddProductAdmin, {
      _id: req.params.id
    })
    .then(async (testData) => {
      const data = await crudController.getBy(Icon, {
        addProductAdminId: req.params.id
      })
      response.successResponse(res, 200, {
        testData,
        data
      });
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.get("/getby/product/:id", (req, res) => {
  log.debug("/api/AddProductAdmin");
  crudController
    .getOne(AddProductAdmin, {
      _id: req.params.id
    })
    .then(async (testData) => {
      const data = await crudController.getBy(Icon, {
        addProductAdminId: req.params.id
      })
      response.successResponse(res, 200, {
        testData,
        data
      });
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.put("/update/:id", (req, res) => {
  log.debug("/api/AddProductAdmin");
  crudController
    .updateBy(AddProductAdmin, req.params.id, req.body)
    .then(async (userData) => {
      var arrIcon = []
      req.body.iconArray.forEach(element => {
        arrIcon.push({
          fileURL: element,
          addProductAdminId: req.params.id
        })
      });
      await crudController.insertMultiple(Icon, arrIcon)
      var userData = await crudController.getOne(AddProductAdmin, {
        _id: req.params.id
      })
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.delete("/delete/:id", (req, res) => {
  log.debug("/api/AddProductAdmin");
  crudController
    .delete(AddProductAdmin, req.params.id)
    .then(async (userData) => {
      const deleteIcon = await Icon.updateMany({
        packageMasterId: req.params.id
      }, {
        status: "deleted"
      });
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.post("/search/product", (req, res) => {
  log.debug("/api/");
  var search = req.body.search
  crudController
    .getBy(AddProductAdmin, {
      productName: {
        "$regex": search,
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
});


module.exports = router;