const mongoose = require("mongoose")

const WithdrawReqSchema = new mongoose.Schema({
    userId : {
        type: String,
        required: true,
        unique: true
    },
    amt:{
        type: Number,
        required: true
    },
    status:{
        type:String,
        Default:"pending"
    },
    createdDate:{
        type: Date,
        default: Date.now
    },
})
module.exports = mongoose.model("WithdrawReqSchemaModel" , WithdrawReqSchema)