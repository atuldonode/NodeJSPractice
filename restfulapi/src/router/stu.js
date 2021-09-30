
const express = require("express");
const router = new express.Router();
const Student = require("../models/student"); 



router.post("/student", async (req, res) => {
    try{
        const user = new Student(req, body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    }catch(err){
        res.status(400).send(err); 
    }
});
 
// // // read data 

router.get("/student", async (req, res) => {
    try{
        const studentsData = await Student.find();
        res.send(studentsData);
    }catch(err){
        res.send(err);
    }
});

//indivisual data by id 
router.get("/student/:id", async (req, res) => {
    try{
        const _id = req.params.id;
        const studentData = await Student.findById(_id);
        res.send(studentData);
        console.log(studentData);

        if(!studentData){
            return res.status(404).send();
            }else{
                res.send(studentData)
            };

    }catch(err){
        res.send(err);
    }
});

module.exports = router;