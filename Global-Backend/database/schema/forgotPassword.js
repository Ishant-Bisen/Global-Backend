const mongoose = require("mongoose")

const UserOtpVerificationSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    uniqueId:{
        type: String,
        required: true,
        unique: true
    },
    otp:{
        type: String,
        required: true,
        unique: true
    },
    createdDate:{
        type: Date,
        default: Date.now
    },
    expireDate:{
        type: Date
    }
})
module.exports = mongoose.model("UserOtpVerificationSchema" , UserOtpVerificationSchema)