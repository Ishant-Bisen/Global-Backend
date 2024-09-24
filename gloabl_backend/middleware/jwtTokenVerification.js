const jwt = require('jsonwebtoken')

const getUser = (req,res,next)=>{
    const token = req.headers.token;
    if(!token) return res.status(400).send("Login First")
    try {
        // this will give the userid on verify 
        const user = jwt.verify(token,process.env.SRT)
        req.user = user;
        user && next()
        
    } catch (error) {
        return res.status(500).send(error)
    }

}
module.exports = getUser
