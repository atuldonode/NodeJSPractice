const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const AddProductAdmin = new Schema({
    additionalDetails: String,
    attachment: String,
    isFeatureProduct: String,
    listPrice: String,
    discount: String,
    mainProductImage: String,
    minimumOrderAmmount: String,
    minimumQuantity: String,
    productBrand: String,
    productDetails: String,
    productName: String,
    stock: String,
    noOfTablet: String,
    noOfStrips: String,
    alternateName: String,
    weight: String,
    yourPrice: String,
    benefits: String,
    storage: String, 
    sideEffect: String,
    howtoUse: String,
    safetyadvice: String,
    directionOfuse: String, 
    benifits: String,
    status: {
        type: String,
        default: "active",
    },
}, {
    timestamps: true,
});
module.exports = mongoose.model("AddProductAdmin", AddProductAdmin);