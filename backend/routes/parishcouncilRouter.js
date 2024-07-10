const express=require("express");
const controller=require("../controller/crudController");
const parishcouncilModel=require("../models/parishcouncilModel");
const router=express.Router();

router.use(
    "/parishcouncil",
    (req,res,next)=>{
        req.model=parishcouncilModel;
        next();
    },
    controller
);
module.exports=router;