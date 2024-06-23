const nodemailer = require("nodemailer")
const sendVerificationEmail = async (email,verificationToken, OTP) => {
    console.log("verification template me aa raha ahai");
    let emailTransporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASS
        }
    });

    emailTransporter.verify((error , success) =>{
        if(error){
            console.log({error:error});
        }else{
            console.log("Ready for Message");
            console.log(success);
        }
    })
    try {
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "OTP to Reset Password",
            html: `
                <h1>OTP will expire in 5 mins.</h1>
                <p>Your OTP to reset the password is : ${OTP}</p>
               
            `
        };
        // this send the email
        const info = await emailTransporter.sendMail(mailOptions);
        console.log("Verification email sent: ", info.messageId);
        return true;
    } catch (error) {
        console.error("Error sending verification email: ", error);
        return false;
    }
};

module.exports = sendVerificationEmail;