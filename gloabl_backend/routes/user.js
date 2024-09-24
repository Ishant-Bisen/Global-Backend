const {Router} = require("express")
const route = Router()
const UserBankDetailsModel = require("../database/schema/BankAccountDetails")
const UserBeneficiaryDetailsSchema = require("../database/schema/BeneficiaryAccountDetails")
const UserModel = require("../database/schema/user")
const jwtVerify = require("../middleware/jwtTokenVerification")
const WithdrawReqModel = require("../database/schema/WithdrawReq")

route.post("/add/bank/details", jwtVerify, async(req,res)=>{
    try {
    
        const data = await UserBankDetailsModel.create(
            {   
                // this uid is the unique key when user uis created
                uid : req.user.id,
                account_holder_name: req.body. account_holder_name,
                account_number : req.body.account_number,
                bank_name : req.body.bank_name,
                ifsc_code : req.body.ifsc_code,
                branch : req.body.branch,
                mobile_number: req.body.mobile_number,
                address: req.body.address
            }
        )
        if(data){
            return res.status(200).send("User Details Added Successfully")
        }
    } catch (error) {
        return res.status(400).send(error)
    }
})

route.get("/get/bank/details", jwtVerify, async(req,res)=>{
    try {
        const response = await UserBankDetailsModel.findOne({
            uid:req.user.id
        })
         
        return res.status(200).send(response)
    } catch (error) {
        return res.status(400).send(error)
    }
})

route.post("/add/beneficiary/details", jwtVerify, async(req,res)=>{
    try {
        const data = await UserBeneficiaryDetailsSchema.create(
            {
                uid : req.user.id,
                account_holder_name: req.body. account_holder_name,
                account_number : req.body.account_number,
                bank_name : req.body.bank_name,
                ifsc_code : req.body.ifsc_code,
                branch : req.body.branch,
                mobile_number: req.body.mobile_number,
                address: req.body.address
            }
        )
        if(data){
            return res.status(200).send("User Details Added Successfully")
        }
    } catch (error) {
        return res.status(400).send(error)
    }
})

route.get("/get/beneficiary/details", jwtVerify, async(req,res)=>{
    try {
        const response = await UserBeneficiaryDetailsSchema.findOne({
            uid:req.user.id
        })
         
        return res.status(200).send(response)
    } catch (error) {
        return res.status(400).send(error)
    }
})

route.post("/withdraw/request", jwtVerify, async(req,res)=>{
    const userId = req.user;
     try{
        const userBankDetails = await UserBankDetailsModel.findOne({uid: userId})
        if(!userBankDetails) return res.status(404).send({error:"User Bank Details Not Added"})
        if(userBankDetails.is_blocked) return res.status.send({error:"User Has Been Blocked."})
        if(userBankDetails.available_amt <= 0) return res.status(404).send({error:"User Available Amt is Zero"})
        const data = WithdrawReqModel.create({
            uid : req.user,
            amt: userBankDetails.available_amt
        })
        return res.status(200).send({success:"Request is Successfully Register"})
     }catch(error){
        return res.status(500).send({error:error})
     }
})



module.exports = route