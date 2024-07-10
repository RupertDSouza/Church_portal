const express=require("express");
const controller=require("../controller/crudController");
const obituaryModel=require("../models/obituaryModel");
const router=express.Router();

router.use(
    "/obituary",
    (req,res,next)=>{
        req.model=obituaryModel;
        next();
    },
    controller
);
module.exports=router;