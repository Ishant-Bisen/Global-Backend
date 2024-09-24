const {Router} = require("express")
const route= Router()
const jwtVerify = require("../../middleware/jwtTokenVerification")
const {initPayment, responsePayment} = require("./service/index");

route.get("/payment/with/paytm", jwtVerify, async(req,res)=>{
    try {
        const amount = req.query.amount;
        if (!amount) {
          return res.status(400).send('Amount query parameter is required');
        }
        const paymentObj = await initPayment(amount);
        res.render('paytmRedirect.ejs', {
          resultData: paymentObj,
          paytmFinalUrl: process.env.PAYTM_FINAL_URL
        });
      } catch (error) {
        res.status(500).send(error.message);
      }

})

route.get("/payment/with/paytm/response" , (req,res)=>{
    responsePayment(req.body).then(
        success => {
            res.render("response.ejs", {resultData: "true", responseData: success});
        },
        error => {
            res.send(error);
        }
    );
})

module.exports = route