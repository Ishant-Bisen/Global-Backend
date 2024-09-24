const { Router } = require('express');
const router = Router(); // Create an instance of Router

const UserVerificationModel = require('../database/schema/UserVerfication');
const UserModel = require('../database/schema/user');

router.get('/verify/:token', async (req, res) => {
    try {
        const {token} = req.params;

        const verificationRecord = await UserVerificationModel.findOne({ uniqueId: token });

        if (!verificationRecord) {
            return res.status(400).json({ message: "Invalid or expired verification token" });
        }

        // Check if the token has expired
        if (verificationRecord.expiresAt < Date.now()) {
            await UserVerificationModel.findByIdAndDelete(verificationRecord._id);
            return res.status(400).json({ message: "Verification token has expired" });
        }

        // Update user to verified
        await UserModel.findByIdAndUpdate(verificationRecord.userId, { verified: true });

        // Delete the verification record
        await UserVerificationModel.findByIdAndDelete(verificationRecord._id);

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        console.error("Error in email verification: ", error);
        res.status(500).json({ message: "Error verifying email" });
    }
});

module.exports = router; // Export the router instance
