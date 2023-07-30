const express = require("express");
const router = new express.Router();
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

router.post("/sendemail", (req, res) => {

    const { emails,message } = req.body;

    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: emails,
            subject: "Sending Email With React And Nodejs",
            text:message,
            html: `<h1>Congratulation</h1> <h1> ${message} </h2>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error" + error)
            } else {
                console.log("Email sent:" + info.response);
                res.status(201).json({ status: 201, info })
            }
        })

    } catch (error) {
        console.log("Error" + error);
        res.status(401).json({ status: 401, error })
    }
});


module.exports = router;

