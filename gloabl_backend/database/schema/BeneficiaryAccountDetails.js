const mongoose = require("mongoose")

const UserBeneficiaryDetailsSchema = new mongoose.Schema({
    uid:{
        type:String,
        required:true,
        unique:true
    },
    account_holder_name : {
        type:String,
        required:true,
        unique:true
    },
    account_number:{
        type:Number,
        required:true,
        unique:true
    },
    bank_name:{
        type:String,
        required:true,
        unique:true
    },
    ifsc_code:{
        type:String,
        required:true,
        unique:true
    },
    branch:{
        type:String,
        required:true,
        unique:true
    },
    mobile_number:{
        type:Number,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true,
        unique:true
    },
    createdDate:{
        type:Date,
        default:Date.now
    },

})
module.exports = mongoose.model("beneficiary_info" , UserBeneficiaryDetailsSchema)