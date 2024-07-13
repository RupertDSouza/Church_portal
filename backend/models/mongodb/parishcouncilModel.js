const mongoose=require("mongoose");
const contact = require("./contactModel");

const parishcouncilSchema=new mongoose.Schema({
    parishcouncilName:{
        type:String,
        require:[true,"Name is Required"],
    },
    image:{
        type:String,
    },
    contact:{
        type:mongoose.Schema.Types.ObjectId,
        ref:contact,
    },
});

const parishcouncil=new mongoose.model("parishcouncil",parishcouncilSchema);

module.exports=parishcouncil;