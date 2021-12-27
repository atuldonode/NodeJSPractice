const express = require("express");
const router = new express.Router();
const Order = require("../models/orders");


router.post("/order", async(req, res) =>{
    try {
        const orderData = new Order(req.body);
        const orderUser = await orderData.save();
        res.send(orderUser);
    } catch (error) {
        res.send(error)
    }
});



router.get("/orderdata", async (req, res) =>{
    try {
        const orderData = await Order.find()
        .populate("userId");
        res.send(orderData);
    } catch (error) {
        res.send(error)
    }
});



router.get("/orderdata:id", async (req, res) =>{
    try {
        const _id = req.params.id;
        const orderid = await Order.findById({_id})
        .populate("userId")
        res.send(orderid);
    } catch (error) {
        res.send(error)
    }
})




const updateOrder = async (_id) =>{
    try {
        const result = await Order.updateOne({_id},{
            $set:{
                productname:"lg"
            }
        });
        console.log(result);
    } catch (error) {
        console.log(error);
    }
};

// updateOrder("618a49821f5a429d9b428557")





const deleteOrder = async (_id) =>{
 try {
     const result = await Order.deleteOne({_id})
 } catch (error) {
     console.log(error);
 }
};
// deleteOrder("618a49bcdfc93ffbca7ee1ab");

module.exports = router;