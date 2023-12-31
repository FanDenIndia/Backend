// routes/payment.js
const express = require('express');
const router = express.Router();
const Insta = require('instamojo-nodejs');

Insta.setKeys(process.env.INSTAMOJO_API_KEY, process.env.INSTAMOJO_AUTH_KEY);
// if(process.env.SANDBOX) Insta.isSandboxMode(true);
// Insta.isSandboxMode(process.env.SANDBOX);


router.post('/createPayment', async (req, res) => {
    const { amount, name, email, phone } = req.body;

    const data = new Insta.PaymentData();
    data.purpose = "Product/Event Purchase"; // REQUIRED
    data.amount = amount;       // REQUIRED
    data.buyer_name = name;
    data.email = email;
    data.phone = phone;
    data.send_email = 'True';
    data.setRedirectUrl(`${process.env.BASE_URL}/paymentComplete`);

    Insta.createPayment(data, function (error, response) {
        if (error) {
            console.error('Error creating payment:', error);
            res.status(500).json({ error: 'An error occurred while creating the payment.' });
        } else {
            const responseData = JSON.parse(response);
            if (responseData.success)
                res.status(200).json({ success: true, redirectUrl: responseData.payment_request.longurl });
            else
                res.status(500).json({ success: false, error: responseData });

        }
    });
});

router.post('/status', async (req, res) => {
    const { payment_id, payment_request_id } = req.body;
    
    try {
        Insta.getPaymentDetails(payment_request_id, payment_id, function (error, response) {
            if (error) {
                console.error('Error getting payment details:', error);
                res.status(500).json({ error: 'An error occurred while getting payment details.' });
            } else {
                // const responseData = JSON.parse(response);
                // console.log(response);
                if (response.success)
                    res.status(200).json({ success: true, data: response });
                else
                    res.status(500).json({ success: false, error: response });
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
    
})

module.exports = router;