const express = require("express");
const User = require("../models/users");

const router = express.Router();

//add user data

router.post("/createuser", async(req, res) => {
    try {
    const resgister = new User(req.body);
    const userCreate = await resgister.save();
    // res.send(userCreate);
    res.status(201).json({
        message: "user log in",
        result: userCreate
    })
    } catch (error) {
        res.send(error)
    } 
});


// get user data

router.get("/userdata", async(req, res) => {
    try {
        const userData = await User.find()
        // .select("fname email")
        // .populate("orderId")
        // res.send(userData);
        res.status(201).json({
            message: "Users",
            UserList: userData
        });
    } catch (error) {
        res.send(error)
    }
    
})


// get user data by id  

router.get("/userdata:id", async(req, res) =>{
    try {
        const _id = req.params.id
        const userData = await User.findById({_id})
        .populate("orderId")
        res.send(userData)
    } catch (error) {
        res.send(error)
    }
})

//update data by id

// const updateUser = async(_id)=>{
//     try {
//         const result = await User.updateOne({_id},{
//             $set:{
//                 fname:"ATULBHAU"
//             }
//         });
//         console.log(result);
//     } catch (error) {
//         console.log(error);
//     }
// }

// updateUser("618a4688a72a16521733dfc6")



// delete data by id

// const deleteUser = async(_id) =>{
//     try {
//         const result = await User.deleteOne({_id})
//         console.log(result);
//     } catch (error) {
//         console.log(error);
//     }
// }
// deleteUser("618a4688a72a16521733dfc6")

module.exports = router;