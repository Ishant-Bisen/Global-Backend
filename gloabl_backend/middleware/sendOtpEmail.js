// this uuid give a unique string as token to validate the user.
const {v4 : uuidv4} = require("uuid")
const sendForgotPasswordTemplate = require("../template/sendForgotPasswordTemplate")
const UserVerificationModel = require("../database/schema/forgotPassword")

const createVerificationToken  = async(email)=>{
    
    const verificationToken = uuidv4();
    const otp = Math.floor(100000+Math.random()*900000);
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>" , userId , email ,verificationToken);
    const user = await UserVerificationModel.find({email:email})
    if(user){
        await UserVerificationModel.deleteOne({email:email})
    }
    const newOtpSchema = await UserVerificationModel.create({
        email: email,
        token: verificationToken,
        otp : otp,
        createdDate: Date.now(),
        expireDate: Date.now() + 60 * 5 * 1000 // 5 min
    });
    if (!newOtpSchema) {
        throw new Error("Failed to create verification OTPSchema");
    }


    // this send verification otp is imported from the template
    const emailSent = await sendForgotPasswordTemplate(email, otp);

    if (emailSent) {
        return { success: emailSent, token: verificationToken };
    } else {
        console.error("Error in createVerificationToken , Email is not send to the user", error);
        const userDelete = await UserVerificationModel.deleteOne({token:verificationToken});
        return { success: false, error: error.message , userdeleted : userDelete };
    }
}
module.exports = createVerificationToken;