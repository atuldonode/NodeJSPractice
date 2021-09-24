const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const User = new Schema({
  userType: String,
  designation: {
    type: String,
    enum: [
      
      "Super Admin",
      "Admin",
      "Student",
      "Teacher",
      "Institue",
    ],
  },
  firstName: String,
  lastName: String,
  deviceToken: String,
  email: String,
  mobileNumber: String,
  location: {
    address: String,
    landmark: String,
    state: String,
    city: String,
    pincode: Number,
    country: String,
    lat: {
      type: String,
      require: true,
    },
    lng: {
      type: String,
      require: true,
    },
  },
  avatar: String,
  loginType: {
    type: String,
    enum: ["Google", "Facebook", "Password", "OTP"],
    default: "Password",
    required: true,
  },
  password: String,
  followingsCount: Number,
  followings: Array,
  followersCount: Number,
  notifications: Array,
  isPushNotificationEnabled: Boolean,
  preferedLanguage: String,
  username: String,
  status: {
    type: String,
    default: "active",
  },
  userPreferences: Array,
  intrestedCategories: Array,
  coursesEnrolled: Array,
  likedCourses: Array,
  instituteId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  teacherId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  paymentMethods: Array,
  transactionsDetails: Array,
  numberOfCoursesCreated: Number,
  allCourses: Array,
  rating: Number,
  payoutHistory: Array,
  totalSales: Number,
  isFreelancer: Boolean,
  studentsList: Array,
  teachersList: Array,
  rating: Number,
  encryptedEmail: String,
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  dob: String,
  isMobileVerified: {
    type: String,
    enum: ["Not", "Verified"],
    default: "Not",
  },
  isEmailVerified: {
    type: String,
    enum: ["Not", "Verified"],
    default: "Not",
  },
  otp: {
    type: String,
  },

}, {
  timestamps: true,
});
module.exports = mongoose.model("User", User);