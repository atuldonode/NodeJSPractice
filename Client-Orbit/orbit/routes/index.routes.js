module.exports = (app) => {
  const User = require("./user/user.routes");
  const Product = require("./product/product.routes");
  const productCatagory = require("./product/productCategories");
  const productSubCategory = require("./product/subCategories")
  const productSearch = require("./search/searchProduct.routes")
  const addCart = require("./product/addCart.routes");

  app.use("/api/user", User);
  app.use("/api/product", Product);
  app.use("/api/product/category", productCatagory);
  app.use("/api/product/subcategory", productSubCategory);
  app.use("/api/search", productSearch)
  app.use("/api/product", addCart);
 
};