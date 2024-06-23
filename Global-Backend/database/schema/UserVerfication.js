const mongoose = require("mongoose")

const UserVerificationSchema = new mongoose.Schema({
    userId : {
        type: String,
        required: true,
        unique: true
    },
    uniqueId:{
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
module.exports = mongoose.model("UserVerificationSchema" , UserVerificationSchema)