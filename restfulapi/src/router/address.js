const express = require("express");
const router = new express.Router();
const Address = require("../models/address")


router.post("/add", async (req, res) => {
    try{
        console.log(req.body);
        const add = new Address(req.body);
        const save = await add.save();
        res.status(201).send(save);
    }catch(err){
        res.status(400).send(err); 
    }
});
 
router.get("/showaddress", async (req, res) => {
    try {
        const  showadress = await address.find();
        res.send(showadress);
    } catch (error) {
        res.send(error)
    }
})

// const deleteAddress = async(_id) =>{
//     try {
//         const showDelete = await Address.deleteOne({_id});
//         console.log(showDelete);
//     } catch (error) {
//         console.log(error);
//     }
// }

// deleteAddress("6134a85990a025b606756169")
module.exports = router;
