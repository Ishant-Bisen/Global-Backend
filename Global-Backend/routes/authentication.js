const {Router} = require("express")
const UserModel = require("../database/schema/user")
const bcrypt = require("bcrypt")
const route = Router()
const jwt = require("jsonwebtoken")

route.post("/signin" , async(req ,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name

    try {

        const user = await UserModel.findOne(
            {email : email}
        ) 
    
        if(user){
            res.status(400).send("Email already Exit")
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const newUser = await UserModel.create({
            name : name,
            email:email,
            password:hash
        })
        
        newUser && res.status(200).send("New User Created");

    } catch (error){
        res.status(500).send(Error);
    }
})

route.get("/login", async (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;
    
    try {
        const user = await UserModel.findOne({ email: email });
        
        if (!user) {
            return res.status(400).send("User Email is incorrect");
        }

        const verify = await bcrypt.compare(pass, user.password);
        
        if (!verify) {
            return res.status(400).send("User Password is Invalid");
        }
        const token = jwt.sign({ id: user._id }, process.env.SRT);
        return res.status(200).send(token);
        
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

module.exports = route