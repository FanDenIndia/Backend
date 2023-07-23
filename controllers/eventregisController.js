const EventRegis = require('../models/eventregisModel')
const qr = require('qrcode')



const geteventsbyemail = async(req, res) => {
    
    const data = await EventRegis.find(req.query);

    if (data) {
        res.status(200).json( data );
    }
    else {
        res.status(400).json({ "message": "No data to display!" });
    }
}


const createEventRegis = async (req, res) => {
    const { firstName, lastName, phone, email, eventName, support, order_notes, used, count,eventID,qrcode } = req.body;

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

    let error = "";
    try {
        await eventregis.validate();
    } catch (err) {
        console.log(err.message.split(":")[2])
        // console.log(err.message);
        error = err;
        res.status(400).json({ "message": error.message.split(":")[2] });
    }

    const neweventregis = await EventRegis.create({
        firstName,
        lastName,
        phone,
        email,
        order_notes,
        eventName,
        support,
        used,
        count,
        eventID,
        qrcode
    });

    let data = {
        _id:neweventregis._id,
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
        qrcode:neweventregis.qrcode
    }

    let config = {
        errorCorrectionLevel: 'H',
        type: 'terminal',
        quality: 0.95,
        margin: 1,
        color: {
            dark: "#010599FF",
            light: "#ff8c8c"
        }
    };

    let strJson = JSON.stringify(data);



    if (neweventregis) {
        console.log(`New event registration ! ${neweventregis}`);
        // console.log("new event registration")

        // Display QR code in base64 string
        // let user = db.
        qr.toDataURL(strJson, config, async (err, code) => {
            if (err) return console.log("error occurred");
            console.log(code)
            const ev = await EventRegis.findByIdAndUpdate(neweventregis._id, { qrcode: code }, {new : true})
            // evregis.qrcode = code;
            console.log(ev);
            res.status(200).json({ "qrcode": code });
        });

    } else {
        res.status(400);
        throw new Error("Event registration failed !");
    }
    // res.json({ message: "Add a event!" });


}



module.exports = { createEventRegis,geteventsbyemail };