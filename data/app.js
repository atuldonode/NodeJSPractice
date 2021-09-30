const mongoose = require ("mongoose");

mongoose.connect("mongodb://localhost:27017/Data")
.then( () => console.log("conection Succesfull.......!"))
.catch( (err) => console.log(err) );

//mongoose schema

const detailsSchema = new mongoose.Schema({
    fName : {
        type : String,
        require : true,
    },
    sName:{
        type: String
    }
})
// collection of creation 

const Details = new mongoose.model("Details", detailsSchema);
const ractDetails = new Details({
    fName : "atul",
    sName: "donode",
})
ractDetails.save();




// read data 
const getDocument = async () => {
    try{
const result = await Details.findOne({fName:"atul"}).limit(0);
console.log(result);
    }catch(err){
console.log(err);
    }
}
getDocument();

//update the document 

// const updateDocument = async(_id) => {
//     try{
// const result = await Details.updateOne({_id},{
//     $set : {
//         fName: "ATUL"
//     }
// });
// console.log(result);
//     }catch(err){
// console.log(err);
//     }
// }

// updateDocument("61386be4d291106d1eabc608");


// delet data 

const deleteDocument = async(_id) => {
    try{
const result = await Details.deleteOne({_id});
console.log(result);
    }catch(err){
console.log(err);
    }
}

deleteDocument("61386be4d291106d1eabc608");






