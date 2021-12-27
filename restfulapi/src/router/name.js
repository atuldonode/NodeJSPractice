const express = require("express");
const router = new express.Router();
const Name = require("../models/name");


router.post("/addname", async(req, res) =>{
    try {
    console.log(req.body);
    const addName = new Name(req.body);
    const adName = await addName.save();
    res.send(adName);
} catch (error) {
        console.log(error);
}
})

router.get("/name", async(req, res) =>{
    try {
        const showName = await Name.find();
        res.send(showName);
    } catch (error) {
        console.log(error);
    }
})

router.get("/name:id", async(req, res) =>{
    try {
        const _id = req.params.id;
        const dataName = await Name.findById(_id)
        res.send(dataName);
        console.log(dataName);
    } catch (error) {
        res.send(error)
    }
})

const updateName = async(_id) =>{
    try {
        const result = await Name.updateOne({_id},{
            $set:{
                fname:"ATUL"
            }
        });
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
updateName("6188eb13603a117bee1819f0");


// const deleteName = async(_id) =>{
// try {
//     const result = await Name.deleteOne({_id});
//    console.log(result);
// } catch (error) {
//     console.log(error);
// }
// };

// deleteName("6188e1cd9fa7ee6e90bcfabd");

module.exports = router;