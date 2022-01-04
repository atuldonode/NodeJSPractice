module.exports = (app) => {
  // Import routes
  let auth = require("../helper/auth");
  let upload = require("./uploadRouter");
  let authRoute = require("./auth");
  let doctor = require("./doctor/doctor");
  let session = require("./conference/session");
  let country = require("./localData/localData");
  let franchisee = require("./franchisee/franchisee");
  let chat = require("./chat/chat");
  let chatHead = require("./chat/chatHead");
  let manageSlot = require("./doctor/slots");
  let search = require("./Search/search")
  let drug = require("./drug/drug");
  let appoinment = require("./doctor/appoinment");
  let qualification = require("./qts/qualification");
  let specialization = require("./qts/specialization");
  let symptoms = require("./qts/symptoms");
  let treatment = require("./qts/treatment");
  let clinic = require("./clinic/clinic");
  let clinicLocation = require("./clinic/clinicLocation");
  let clinicMembers = require("./clinic/clinicMembers");
  let doctorQualification = require("./doctor/doctorsQualification");
  let lab = require("./testAndLabs/lab");
  let doctorSpecialization = require("./doctor/doctorsSpecialization");
  let doctorTreatments = require("./doctor/doctorsTreatments");
  let labPackage = require("./testAndLabs/labPackage");
  let addPractice = require("./addPracticeStaff/AddPractice.route");
  let packageTest = require("./testAndLabs/packageTest");
  let profile = require("./testAndLabs/profile");
  let profileTest = require("./testAndLabs/profileTest");
  let test = require("./testAndLabs/tests");
  let procedure = require("./procedure/procedure");
  let mrmberTiming = require("./clinic/memberTimings");
  let happyCustomers = require("./coustemerReviews");
  let topOffer = require("./topOffer");
  let awards = require("./qts/award");
  let membership = require("./qts/memberships");
  let docMemberships = require("./doctor/doctorsMemberships");
  let docAwards = require("./doctor/doctorsAwards");
  let queAns = require("./doctor/queAns");
  let healthFeed = require("./healthFeed");
  let prefix = require("./prefix");
  let doctorDocs = require("./doctor/doctorDoc");
  let doctorSymp = require("./doctor/doctorsSymptoms");
  let facilities = require("./clinic/facilities");
  let clinicfacilities = require("./clinic/clinicFacilities");
  let paymentRoute = require("./payment/payment");
  let contactRoute = require("./contact");
  let medicineRoute = require("./medicine/medicine");
  let receiptRoute = require("./medicine/medicalReceipt");


  //=========PRODUCTS=============
  let product = require("./products/products");
  let prodCat = require("./products/productCatagories");
  let prodSubCat = require("./products/productSubCatagories");
  let userCart = require("./products/usersCart");
  let Article = require('./Article/article.routes');
  let banner = require("./home/banner.routes");
  let practice = require("./practice/practice");
  let addPracticeOtherStaff = require("./AddPracticeOtherStaff/addPracticeOtherStaff.route");
  let patientDetails = require("./patientDetails/patientDetails.routes");
  let slotPatientDetails = require("./patientDetails/slotPatientDetails.route");
  let addProductAdmin = require("./AddProductAdmin/AddProduct.routes");
  let iconPhoto = require("./testAndLabs/iconPhoto");
  let medicineBanner = require('./banners/MedicineBanner.route');
  let ourProducts = require("./ourProducts/OurProducts.route");
  let medicineCategory = require("./medicineCategory/medicineCategory.route");
  let doctorPanel = require("./doctorPanel/doctorCalender.route");
  let doctorPatients = require("./doctorPanel/doctorPatients.routes");
  let doctorReg = require("./doctor/doctorReg");
  let searchLocation = require('./searchLocation/searchLocation.routes');
  let ClinicFoam = require("./requirements/ClinicFoam.route");
  let doctorClinic = require("./doctorClinic/doctorClinic.route");
  let comment = require("./comment/doctorProfileComment.route");
  let replyComment = require("./comment/replyComment/replycoment.route");
  let replyCommentLike = require("./comment/replyComment/replyCommentLike.route");
  let commentLike = require("./comment/commentLike.route");
  let amenities = require("./amenities/amenities.route");
  let qnaDoctor = require("./qnaDoctor/qnaDoc.js");
  let qnaReply = require("./qnaDoctor/qnaReply.js");
  let notificationSent = require("./notification/notification.route");
  let medicineBrand = require("./medicineBrand/medicineBrand.route");

let mainCategory = require("./category/mainCategory.route");
let Category = require("./category/category.routes");
let Subcategory = require("./category/subcategory.routes");

let mainCategorysearch = require("./Search/mainCategory")
let subCategorySearch = require("./Search/subCategorySearch")
let CategorySearch = require("./Search/Categorysearch")
let Faq = require("./FAQ/faq.routes");
let QnA = require("./FAQ/QnA.routes");
let articleSearch = require("./Search/articleSearch");



  app.use("/api/v1/searchLocation", searchLocation);
  app.use("/api/v1/medicineBrand", medicineBrand);
  app.use("/api/v1/amenities", amenities);
  app.use("/api/v1/doctorPatients", doctorPatients);
  app.use("/api/v1/article", Article);
  app.use("/api/v1/authentication", authRoute);
  app.use("/api/v1/uploads", upload);
  app.use("/api/v1/drug", drug);
  app.use("/api/v1/product", product);
  app.use("/api/v1/doctor", doctor);
  app.use("/api/v1/conference", session);
  app.use("/api/v1/country", country);
  app.use("/api/v1/franchisee", franchisee);
  app.use("/api/v1/chat", chat);
  app.use("/api/v1/chathead", chatHead);
  app.use("/api/v1/slots", manageSlot);
  app.use("/api/v1/appoinment", appoinment);
  app.use("/api/v1/qualification", qualification);
  app.use("/api/v1/specialization", specialization);
  app.use("/api/v1/treatment", treatment);
  app.use("/api/v1/clinic", clinic);
  app.use("/api/v1/clinic/location", clinicLocation);
  app.use("/api/v1/clinic/members", clinicMembers);
  app.use("/api/v1/doctor/qualification", doctorQualification);
  app.use("/api/v1/doctor/specialization", doctorSpecialization);
  app.use("/api/v1/doctor/treatments", doctorTreatments);
  app.use("/api/v1/lab", lab);
  app.use("/api/v1/tests", test);
  app.use("/api/v1/labs/packages", labPackage);
  app.use("/api/v1/package/test", packageTest);
  app.use("/api/v1/profile", profile);
  app.use("/api/v1/profiles/test", profileTest);
  app.use("/api/v1/product/catagories", prodCat);
  app.use("/api/v1/product/subCatagories", prodSubCat);
  app.use("/api/v1/clinic/timings", mrmberTiming);
  app.use("/api/v1/customer/review", happyCustomers);
  app.use("/api/v1/top/offer", topOffer);
  app.use("/api/v1/award", awards);
  app.use("/api/v1/doctor/award", docAwards);
  app.use("/api/v1/membership", membership);
  app.use("/api/v1/doctor/membership", docMemberships);
  app.use("/api/v1/QA", queAns);
  app.use("/api/v1/HF", healthFeed);
  app.use("/api/v1/userCart", userCart);
  app.use("/api/v1/symptoms", symptoms);
  app.use("/api/v1/AddPractice/Staff", addPractice);
  app.use("/api/v1/prefix", prefix);
  app.use("/api/v1/doctorDocs", doctorDocs);
  app.use("/api/v1/doctorSymptoms", doctorSymp);
  app.use("/api/v1/facilities", facilities);
  app.use("/api/v1/clinicFfacilities", clinicfacilities);
  app.use("/api/v1/payment", paymentRoute);
  app.use("/api/v1/contact", contactRoute);
  app.use("/api/v1/medicine", medicineRoute)
  app.use("/api/v1/search", search);
  app.use("/api/v1/procedure", procedure);
  app.use("/api/v1/doctorRegister", doctorReg)
  app.use("/api/v1/receipt", receiptRoute)
  app.use("/api/v1/banner", banner);
  app.use("/api/v1/practice", practice);
  app.use("/api/v1/addPractice/OtherStaff", addPracticeOtherStaff);
  app.use("/api/v1/addPatient", patientDetails);
  app.use("/api/v1/slotPatientDetails", slotPatientDetails);
  app.use("/api/v1/addProduct", addProductAdmin);
  app.use("/api/v1/iconPhoto", iconPhoto);
  app.use("/api/v1/medicineBanner", medicineBanner);
  app.use("/api/v1/ourProducts", ourProducts);
  app.use("/api/v1/medicineCategory", medicineCategory);
  app.use("/api/v1/doctorPanel", doctorPanel);
  app.use("/api/v1/doctorPatients", doctorPatients);
  app.use("/api/v1/ClinicFoam", ClinicFoam);
  app.use("/api/v1/doctorClinic", doctorClinic);
  app.use("/api/v1/doctorComment", comment);
  app.use("/api/v1/replyComment", replyComment);
  app.use("/api/v1/qnaReply", qnaReply);
  app.use("/api/v1/qnaDoctor", qnaDoctor);
  app.use("/api/v1/commentLike", commentLike);
  app.use("/api/v1/replyCommentLike", replyCommentLike);
  app.use("/api/v1/notificationSent", notificationSent);
 
  app.use("/api/v1/maincategory", mainCategory);
  app.use("/api/v1/category", Category);
  app.use("/api/v1/subcategory", Subcategory);

  app.use("/api/v1/search/maincategory", mainCategorysearch);
  app.use("/api/v1/search/subcategory", subCategorySearch);
  app.use("/api/v1/search/category", CategorySearch);

  app.use("/api/v1/faq/faqtype", Faq);
  app.use("/api/v1/faq/qna", QnA);
  app.use("/api/v1/article/search", articleSearch);
  

  

};