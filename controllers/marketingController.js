const EventRegis = require('../models/eventregisModel');

const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

const sendBulkEmail = async (req, res) => {
  const { emails, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: emails,
      subject: 'Fan Den India Official',
      // text: message,
      html: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error ' + error);
      } else {
        console.log('Email sent:' + info.response);
        res.status(201).json({ status: 201, info });
      }
    });
  } catch (error) {
    console.log('Error' + error);
    res.status(401).json({ status: 401, error });
  }
};

const sendEventRegisMail = async (req, res) => {
  try {
    // Fetch all emails from eventRegisModel (replace with your actual logic)
    const eventRegistrations = await EventRegis.find({}, 'email');

    // Extract email addresses from the retrieved data
    const emails = eventRegistrations.map(registration => registration.email);

    if (emails.length === 0) {
      return res.status(404).json({ status: 404, message: 'No emails found in event registrations.' });
    }

    const message = req.body.message; // Get the message from the request body


    // Send bulk email
    const info = await sendMail(emails, message);

    console.log('Emails sent:', info.response);
    return res.status(201).json({ status: 201, info });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ status: 500, error: 'Internal server error' });
  }
};

const sendMail = async (emails, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: emails,
      subject: 'Fan Den India Official',
      html: message,
    };

    return await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  sendBulkEmail,
  sendEventRegisMail,
};
