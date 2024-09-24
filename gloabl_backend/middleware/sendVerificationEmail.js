// this uuid give a unique string as token to validate the user.
const {v4 : uuidv4} = require("uuid")
const sendVerificationEmailTemplate = require("../template/sendVerificationMailTemplate")
const UserVerificationModel = require("../database/schema/UserVerfication")

const createVerificationToken  = async(userId  ,email)=>{
    
    const verificationToken = uuidv4();
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>" , userId , email ,verificationToken);
    const user = await UserVerificationModel.findOne({userId:userId})
    if(user){
        await UserVerificationModel.deleteOne({userId:userId})
    }
    const newVerification = await UserVerificationModel.create({
        userId: userId,
        uniqueId: verificationToken,
        createdDate: Date.now(),
        expireDate: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    });
    if (!newVerification) {
        throw new Error("Failed to create verification token");
    }
    
// this send verification is imported from the template
    const emailSent = await sendVerificationEmailTemplate(email, verificationToken);
    if (emailSent) {
        return { success: emailSent, token: verificationToken };
    } else {
        console.error("Error in createVerificationToken , Email is not send to the user", error);
        const userDelete = await UserVerificationModel.deleteOne({userId:userId});
        return { success: false, error: error.message , userdeleted : userDelete };
    }
}
module.exports = createVerificationToken;