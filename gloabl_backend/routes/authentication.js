const {Router} = require("express")
const UserModel = require("../database/schema/user")
const UserVerificationModel = require("../database/schema/UserVerfication")
const bcrypt = require("bcrypt")
const route = Router()
const jwt = require("jsonwebtoken");
const verificationEmail = require("../middleware/sendVerificationEmail");
const UserOtpVerificationSchema = require("../database/schema/forgotPassword");
const sendVerificationOtp = require("../middleware/sendOtpEmail")


                    //......................................................................//

route.post("/signup" , async(req ,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name

    try {

        const user = await UserModel.findOne(
            {email : email}
        ) 
    
        if(user){
            res.status(400).send({error:"Email already Exit"})
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const newUser = await UserModel.create({
            name : name,
            email:email,
            password:hash,
            verified:false
        })
        if(!newUser) return res.status(500).send({error:"New User not Created,Try again!"});
        // calling the middleware to send the verification email to the user.
        const sendVerificationEmail = await verificationEmail(newUser._id , email)
        if(!sendVerificationEmail.success){ 
            return res.status(201).send({
                message: "User is created but verification email does not send to the user",
                verification : false
            })
        }
        return res.status(200).send({
            message : "User is created and email verification mail is send to the user Email ",
            verification : true
        })
    } catch (error){
        res.status(500).send({error: error});
    }
})

                 //......................................................................//


route.get("/login", async (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;
    
    try {
        const user = await UserModel.findOne({ email: email });
        
        if (!user) {
            return res.status(404).send({error:"User Email is incorrect"});
        }

        const verify = await bcrypt.compare(pass, user.password);
        
        if (!verify) {
            return res.status(404).send({error:"User Password is Invalid"});
        }
        const token = jwt.sign({ id: user._id }, process.env.SRT);
        return res.status(200).send({token:token});
        
    } catch (error) {
        return res.status(500).send({error:error});
    }
});

                    //......................................................................//

route.post("/forgot/password", async(req,res)=>{
   
    try {
        const email = req.body.email;
        const user = await UserModel.findOne({email : email})
        if(!user) return res.status(404).send({message :"User not found!"})
        
        if(!user.verified){
            return res.status(500).send({
                message : "User email is not verified can do any thing!",
                verification : false
            })
        }
        
        const sendEmail = await sendVerificationOtp(email);
        if(!sendEmail) return res.status(404).send({error:"otp email has not been sent, please try again!"})
        return res.status(200).send(sendEmail);
        
    } catch (error) {
        return res.status(500).send({error :error});
    }
})

                    //......................................................................//

route.put("/reset/password" , async(req,res)=>{
     const token  = req.query.token;
     const otp = req.body.otp;
     const password = req.body.password;
     const confirm_password = req.body.confirm_password
     try {
        const otpschema = await UserOtpVerificationSchema.findOne({token :token});
        const storeotp = otpschema.otp
        console.log(storeotp, otp ,token);
        const user = await UserModel.findOne({email : otpschema.email});
        if(password !== confirm_password) return res.status(404).send({error : "Password is not matched!"});
        
        if(storeotp !== otp) return res.status(404).send({error : "Invalid OTP"});
        // if(otpschema.expireDate < Date.now() return res.status(500).send({error:"otp has been expired!"})
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        user.password = hash;
        await user.save()
        await otpschema.deleteOne({token:token})
        return res.status(200).send({message : "Password Successfully reset."})
        
     } catch (error) {
        return res.status(500).send({error: error});
     }
})


                    //......................................................................//

module.exports = route