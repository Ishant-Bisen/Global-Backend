const express = require("express")
const app = express()
app.use(express.json());
require("dotenv").config();
var querystring = require('querystring');
const connect = require("./database/dbConnect")
const auth = require("./routes/authentication")
const user = require("./routes/user")
const admin = require("./routes/admin")
const userVerificationController =  require("./controller/verifyUserEmailLink") 
const paytmPayment = require("./routes/Paytm/index")
const cors = require("cors")
connect()
const ejs = require("ejs");
app.use(cors({
   origin : "http://localhost:3000"
}))

app.use("/global/auth" , auth)
app.use("/global/user" , user)
app.use("/global/admin",admin)
app.use("/user/verification" ,userVerificationController)
app.use("/payment" , paytmPayment)

app.use(express.static(__dirname + "/routes/Paytm/view"));
app.set("view engine", "ejs");

app.get("/" , (req ,res)=>{
  console.log("hello server is ready");
  res.send("hii")
})

const port = process.env.PORT
app.listen(process.env.PORT , ()=>{
    console.log("port is running in",{port});
})