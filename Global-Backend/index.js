const express = require("express")
const app = express()
const mongoose = require('mongoose');
const connect = require("./database/dbConnect")
app.use(express.json());
require("dotenv").config();
const auth = require("./routes/authentication")
connect()

app.use("/global" , auth)
app.get("/" , (req ,res)=>{
  console.log("hello server is ready");
  res.send("hii")
})
const port = process.env.PORT
app.listen(process.env.PORT , ()=>{
    console.log("port is running in",{port});
})