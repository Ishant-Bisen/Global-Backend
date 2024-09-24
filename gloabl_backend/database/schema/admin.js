const mongoose = require("mongoose")

const adminModel = new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    password: {
        type:String,
        require:true
    }
})

module.exports = mongoose.model("adminModel" , adminModel);