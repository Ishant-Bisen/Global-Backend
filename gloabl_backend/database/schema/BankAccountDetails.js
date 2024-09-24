const mongoose = require("mongoose")

const UserBankDetailsSchema = new mongoose.Schema({
    uid:{
        type:String,
        required:true,
        unique:true
    },
    account_holder_name : {
        type:String,
        required:true
    },
    account_number:{
        type:Number,
        required:true,
        unique:true
    },
    bank_name:{
        type:String,
        required:true
    },
    ifsc_code:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    mobile_number:{
        type:Number,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    allocated_amt: {
        type: Number,
        default: 0.0  // Default value is set to 0.0 for floating-point
    },
    withdraw_amt: {
        type : Number,
        default: 0.0
    },
    locked_amt: {
        type : Number,
        default: 0.0
    },
    available_amt: {
        type : Number,
        default: 0.0
    },
    is_blocked:{
        type:Boolean,
        Default:false
    },
    createdDate:{
        type:Date,
        default:Date.now
    },

})
module.exports = mongoose.model("bank_info" , UserBankDetailsSchema)