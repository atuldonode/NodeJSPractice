// const mongoose = require ("mongoose");

// mongoose.connect("mongodb://localhost:27017/adDataBase")
// .then( () => console.log("conection Succesfull.......!"))
// .catch( (err) => console.log(err) );

// //mongoose schema

// const detailsSchema = new mongoose.Schema({
//     fName : {
//         type : String,
//         require : true,
//     },
//     sName: String,
//     adress:String,
//     age: Number,
//     active: Boolean,
//     Date:{
//         type: Date,
//         default: Date.now,
//     }
// })
// // collection of creation 

// const Details = new mongoose.model("Details", detailsSchema);

// // create document or insert 
// const ractDetails = new Details({
//     fName : "atul",
//     sName: "donode",
//     adress:"Salangtola",
//     age: 25,
//     active: true
    
// })
// ractDetails.save();



//second way

// const mongoose = require ("mongoose");

// mongoose.connect("mongodb://localhost:27017/adDataBase")
// .then( () => console.log("conection Succesfull.......!"))
// .catch( (err) => console.log(err) );

// //mongoose schema

// const detailsSchema = new mongoose.Schema({
//     fName : {
//         type : String,
//         require : true,
//     },
//     sName: String,
//     adress:String,
//     age: Number,
//     active: Boolean,
//     Date:{
//         type: Date,
//         default: Date.now,
//     }
// })
// // collection of creation 

// const Details = new mongoose.model("Details", detailsSchema);

// // create document or insert 

// const creatDocument = async () => {
// try{
//     const ractDetails = new Details({
//         fName : "atulD",
//         sName: "Donode",
//         adress:"Salangtola",
//         age: 27,
//         active: true
//         })
//         const result = await ractDetails.save();
//         console.log(result); 
// }catch(err) {
//     console.log(err);
// };
    
// }
// creatDocument();


//multiple data add

const mongoose = require ("mongoose");

mongoose.connect("mongodb://localhost:27017/adDataBase")
.then( () => console.log("conection Succesfull.......!"))
.catch( (err) => console.log(err) );

//mongoose schema

const detailsSchema = new mongoose.Schema({
    fName : {
        type : String,
        require : true,
    },
    type: String,
    adress:String,
    age: Number,
    active: Boolean,
    Date:{
        type: Date,
        default: Date.now,
    }
})
// collection of creation 

const Details = new mongoose.model("Details", detailsSchema);

// create document or insert 

const creatDocument = async () => {
try{
    const ractDetails = new Details({
        fName : "atulD",
        sName: "Donode",
        adress:"Salangtola",
        age: 27,
        active: true
        })

        const jsDetails = new Details({
            fName : "JavaScript",
            type: "back end",
            adress:"Salangtola",
            age: 41,
            active: true
            })

            const nodeDetails = new Details({
                fName : "NodeJS",
                type: "Dobackendnode",
                adress:"Salangtola",
                age: 12,
                active: true
                })

                const mongoDetails = new Details({
                    fName : "mongoose",
                    type: "database",
                    adress:"Salangtola",
                    age: 32,
                    active: true
                    })

        const result = await Details.insertMany([ractDetails, jsDetails, nodeDetails, mongoDetails]);
        console.log(result); 
}catch(err) {
    console.log(err);
};
    
}
// creatDocument();

// read data 
// const getDocument = async () => {
//     try{
// const result = await Details.find({type:"back end", index: "0"})
// .select({fname:1})
// .limit(1);
// console.log(result);
//     }catch(err){
// console.log();
//     }
// }

// getDocument();

//update the document 

const updateDocument = async(_id) => {
    try{
const result = await Details.updateOne({_id},{
    $set : {
        fName: "ATUL"
    }
});
console.log(result);
    }catch(err){
console.log(err);
    }
}

updateDocument("6130b711e270afb4be65a9c9");