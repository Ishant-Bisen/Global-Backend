const nodemailer = require("nodemailer")
const sendVerificationEmail = async (email, verificationToken) => {
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
            subject: "Email Verification for Global Account",
            html: `
                <h1>Verify Your Email, link will expire in 24 hours.</h1>
                <p>Please click the link below to verify your email address:</p>
                <a href="${process.env.BASE_URL}/user/verification/verify/${verificationToken}">Verify Email</a>
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