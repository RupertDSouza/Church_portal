const mongoose=require ("mongoose");

const contactSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    designation:{
        type:String,
    },
    contacts:{
        type:Number,
        require:true,
    },
    email:{
        type:String,
    },

});

const contact=new mongoose.model("contact",contactSchema);

module.exports=contact;