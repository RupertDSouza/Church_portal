const express=require("express");
const controller=require("../controller/crudController");
const userModel=require("../models/userModel");
const router=express.Router();

router.use(
    "/user",
    (req,res,next)=>{
        req.model=userModel;
        next();
    },
    controller
);
module.exports=router;