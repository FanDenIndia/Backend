const { default: mongoose } = require('mongoose');
const EventRegis = require('../models/eventregisModel');
const qr = require('qrcode');

const geteventsbyemail = async (req, res) => {
  const data = await EventRegis.find(req.query);

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(400).json({ message: 'No data to display!' });
  }
};

const getallemailsforparticularevent = async (req, res) => {
  try {
    const data = await EventRegis.find(req.query);

    if (data.length === 0) {
      return res.status(400).json({ message: 'No data found!' });
    }

    const emailList = data.map((eventRegis) => eventRegis.email);
    res.status(200).json(emailList);
  } catch (error) {
    res.status(400).json({ message: 'Internal server error' });
  }
};

// const getallemailsforparticularevent = async (req, res) => {
//   const data = await EventRegis.find(req.query);
//   data.forEach((EventRegis) => {
//     res.send(EventRegis.email);
//   });

//   if (data) {
//     res.status(200).json(data);
//   } else {
//     res.status(400).json({ message: 'No data to display!' });
//   }
// };

const createEventRegis = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      eventName,
      support,
      order_notes,
      used,
      count,
      eventID,
      qrcode,
      paymentId
    } = req.body;

    // Check if a record with the same paymentId already exists
    const existingEventRegis = await EventRegis.findOne({ paymentId }).session(session);

    if (existingEventRegis) {
      // If a record with the same paymentId exists, return an error response
      return res.status(400).json({ message: 'Event registration with the same paymentId already exists.' });
    }

    const eventregis = new EventRegis();
    eventregis.firstName = firstName;
    eventregis.lastName = lastName;
    eventregis.phone = phone;
    eventregis.eventName = eventName;
    eventregis.email = email;
    eventregis.support = support;
    eventregis.order_notes = order_notes;
    eventregis.used = used;
    eventregis.count = count;
    eventregis.eventID = eventID;
    eventregis.qrcode = qrcode;
    eventregis.paymentId = paymentId;

    await eventregis.validate();

    const neweventregis = await eventregis.save({ session: session });

    let data = {
      _id: neweventregis._id,
      firstName: neweventregis.firstName,
      lastName: neweventregis.lastName,
      phone: neweventregis.phone,
      email: neweventregis.email,
      eventName: neweventregis.eventName,
      order_notes: neweventregis.order_notes,
      support: neweventregis.support,
      used: neweventregis.used,
      count: neweventregis.count,
      eventID: neweventregis.eventID,
      qrcode: neweventregis.qrcode,
      paymentId: neweventregis.paymentId
    };

    let config = {
      errorCorrectionLevel: 'H',
      type: 'terminal',
      quality: 0.95,
      margin: 1,
      color: {
        dark: '#010599FF',
        light: '#ff8c8c',
      },
    };

    let strJson = JSON.stringify(data);

    if (neweventregis) {
      console.log(`New event registration! ${neweventregis}`);

      // Display QR code in base64 string
      qr.toDataURL(strJson, config, async (err, code) => {
        if (err) {
          await session.abortTransaction();
          session.endSession();
          return console.log('error occurred');
        }
        console.log(code);
        const ev = await EventRegis.findByIdAndUpdate(
          neweventregis._id,
          { qrcode: code },
          { new: true, session: session }
        );
        console.log(ev);

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ qrcode: code });
      });
    } else {
      await session.abortTransaction();
      session.endSession();
      res.status(400);
      throw new Error('Event registration failed!');
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createEventRegis,
  geteventsbyemail,
  getallemailsforparticularevent,
};
