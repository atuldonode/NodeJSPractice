const { getTestMessageUrl } = require("nodemailer");
const {
  schema
} = require("../../models/logs");

let a1 = {};
let a2 = {};
let a3 ={};

module.exports = {

  
  getByfilterName: (doctor,clinics,name,city) => {
    return new Promise(function (resolve, reject) {


      doctor
        .find({

          "firstName":{$regex: new RegExp('.*' + name.toLowerCase() + '.*', 'i')},
          designation: "Doctor",
          "location.city":city,
       
          status: {
            $ne: "deleted"
          }
        },
        )
        .then((resData) => {
          a1 = resData
          console.log(a1)

          clinics
        .find({

          "name":{$regex: new RegExp('.*' + name.toLowerCase() + '.*', 'i')},
          
          status: {
            $ne: "deleted"
          }
        },
        )
        .then((resData) => {
         
         a2 =resData
         let a3 = {
           "Doctors":{
             "data":a1
           },
           "Clinics":{
            "data":a2
          }
         }
          resolve(a3);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });

         // resolve(resData);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });

    } );
  },

  searchLabTest: (lab,test,name,city) => {
    return new Promise(function (resolve, reject) {


      lab
        .find({

          "name":{$regex: new RegExp('.*' + name.toLowerCase() + '.*', 'i')},
          "location.city":city,
       
          status: {
            $ne: "deleted"
          }
        },
        )
        .then((resData) => {
          a1 = resData
          console.log(a1)

          test
        .find({

          "title":{$regex: new RegExp('.*' + name.toLowerCase() + '.*', 'i')},
          
          status: {
            $ne: "deleted"
          }
        },
        )
        .then((resData) => {
         console.log(resData)
         a2 =resData
         let a3 = {
           "Labs":{
             "data":a1
           },
           "Tests":{
            "data":a2
          }
         }
          resolve(a3);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });

         // resolve(resData);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });

    } );
  },



  searchBySpecialitySymptomDoctorClinic: (speciality,symptom,doctor,clinics,name,city) => {
    return new Promise(function (resolve, reject) {


      doctor
        .find({

          "firstName":{$regex: new RegExp('.*' + name.toLowerCase() + '.*', 'i')},
          designation: "Doctor",
          "location.city":city,
       
          status: {
            $ne: "deleted"
          }
        },
        )
        .then((resData) => {
          a1 = resData
          //console.log(a1)

          //clinics
          clinics
        .find({

          "name":{$regex: new RegExp('.*' + name.toLowerCase() + '.*', 'i')},
          
          status: {
            $ne: "deleted"
          }
        },
        )
        .then((resData) => {
         
         a2 =resData
        //  let a3 = {
        //    "Doctors":{
        //      "data":a1
        //    },
        //    "Clinics":{
        //     "data":a2
        //   }
        //  }
          //resolve(a3);

          // specialist
          speciality
          .find({
  
            "shortName":{$regex: new RegExp('.*' + name.toLowerCase() + '.*', 'i')},
            
            status: {
              $ne: "deleted"
            }
          },
          )
          .then((resData) => {
           
           a3 =resData
          //  let a3 = {
          //    "Doctors":{
          //      "data":a1
          //    },
          //    "Clinics":{
          //     "data":a2
          //   }
          //  }
            //resolve(a3);
  
            symptom
            .find({
    
              "fullName":{$regex: new RegExp('.*' + name.toLowerCase() + '.*', 'i')},
              
              status: {
                $ne: "deleted"
              }
            },
            )
            .then((resData) => {
             
             a4 =resData
             let a5 = {
               "Speciality":{
                 "data":a3
               },
               "symptoms":{
                "data":a4
              },
               "Doctors":{
                 "data":a1
               },
               "Clinics":{
                "data":a2
              }
             }
              resolve(a5);
    
              
    
    
    
            })
            .catch((error) => {
              console.log("error", error);
              reject(error);
            });
    
            
  
  
  
          })
          .catch((error) => {
            console.log("error", error);
            reject(error);
          });
  







        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });

         // resolve(resData);
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });

    } );
  },

  

  
}