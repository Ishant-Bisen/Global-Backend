const mongoose = require("mongoose")

const transSchema = new mongoose.Schema({
    uid :{
        type:String,
        require:true
    },
    user:{
        type:String,
        require:true
    },
    amt:{
        type:Number,
        require:true
    },
    account_number:{
        type:Number,
        require:true
    },
    mobile_number:{
        type:Number,
        require:true
    },
    type:{
        type:String,
        requie:true
    },
    bank_name:{
        type:String,
        require:true
    },
    trans_date:{
        type:Date,
        default:Date.now()
    }

})

module.exports = mongoose.model("transSchema" , transSchema)