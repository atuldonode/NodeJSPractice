const express = require("express");
const router = new express.Router();

const Signup = require("../models/signup");


router.post("/signup", async (req, res) =>{
    try {
    const signupData = new Signup(req.body);
    const createData = await signupData.save();
    res.send(createData);
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;