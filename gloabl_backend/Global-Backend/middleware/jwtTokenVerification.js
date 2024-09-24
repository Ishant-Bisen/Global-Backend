const jwt = require('jsonwebtoken')

const getUser = (req,res,next)=>{
    const token = req.token;
    !token && res.status(400).send("Login First")
    try {
        const user = jwt.verify(token,process.env.SRT)
        req.user = user;
        user && next()
        
    } catch (error) {
        res.status(500).send(error)
    }

}
