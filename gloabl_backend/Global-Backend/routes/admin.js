const {Router} = require("express");
const route = Router()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminModel = require("../database/schema/admin")
const verifyJWT = require("../middleware/jwtTokenVerification")
const UserModel = require("../database/schema/user")
const UserBankModel = require("../database/schema/BankAccountDetails")

route.post("/signin" , async(req ,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name

    try {

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const newUser = await AdminModel.create({
            name : name,
            email:email,
            password:hash
        })
        
        newUser && res.status(200).send("New User Created");

    } catch (error){
        res.status(500).send(Error);
    }
})

route.get("/login" , async(req , res)=>{
    const email = req.body.email;
    const password = req.body.password;
   
    try {
        const admin = await AdminModel.findOne({
            email:email
        })
        const verify = bcrypt.compare(admin.password , password);
        if(!verify) return res.status(404).send({error:"Password is Incorrect"})
        const token = jwt.sign({id:admin._id} , process.env.SRT);
        return res.status(200).send(token); 
    } catch (error) {
        console.log(error);
        return res.status(500).send({error:error});
    }

})

route.get("/get/user/details" ,verifyJWT, async(req,res)=>{

    try {
        const userData = await UserModel.find();
        return res.status(200).send(userData);
    } catch (error) {
        console.log(error);
        return res.status(500).sned({error:error});
    }

})

route.get("/get/user/bankdetails", verifyJWT, async(req,res)=>{
    const email = req.body.email;
    const mobile_number = req.body.mobile_number;

    try {
        const user = await UserBankModel.find({
            $or: [
                { email: email },
                { mobile_number: mobile_number }
            ]
        })
        if(!user) return res.status(404).send({error: "Credentials are not correct!"})
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({error: error})
    }

})

route.post("/user/amount/allocation", verifyJWT, async (req, res) => {
    try {
        const { email, number: mobile_number, allocated_amount, locked_amount } = req.body;
        
        const user = await UserBankModel.findOne({
            $or: [
                { email: email },
                { mobile_number: mobile_number }
            ]
        });

        if (!user) {
            return res.status(404).send("User not Found");
        }
     
        if (allocated_amount !== undefined && locked_amount !== undefined) {
            if (allocated_amount < locked_amount) {
                return res.status(400).send(`Locked Amount (${locked_amount}) can't be greater than Allocated Amount (${allocated_amount})`);
            }
            user.allocated_amt = allocated_amount;
            user.locked_amt = locked_amount;
            user.available_amt = allocated_amount - locked_amount;
        } else if (allocated_amount !== undefined) {
            if (user.locked_amt > allocated_amount) {
                return res.status(400).send(`Locked Amount (${user.locked_amt}) can't be greater than Allocated Amount (${allocated_amount})`);
            }
            user.allocated_amt = allocated_amount;
            user.available_amt = allocated_amount - user.locked_amt;
        } else if (locked_amount !== undefined) {
            if (locked_amount > user.allocated_amt) {
                return res.status(400).send(`Locked Amount (${locked_amount}) can't be greater than Allocated Amount (${user.allocated_amt})`);
            }
            user.locked_amt = locked_amount;
            user.available_amt = user.allocated_amt - locked_amount;
        }

        const updatedUser = await user.save();
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: error.message });
    }
})

module.exports = route








