const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const Event = require('../models/eventModel')
const Coordinator = require('../models/coordinatorModel')
const EventRegis = require('../models/eventregisModel')


//@desc Register a user
//@route POST /api/users/register
//@access public
const registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const admin1 = new Admin();
    admin1.name = name;
    admin1.email = email;
    admin1.password = password;
    // pat.isAdmin = isAdmin;

    let error = "";
    try {
        await admin1.validate();
    } catch (err) {
        console.log(err.message.split(":")[2])
        error = err;
    }

    if (error) {
        res.status(400);
        throw new Error(error.message.split(": ")[2])
    }



    const adminAvailable = await Admin.findOne({ email });
    if (adminAvailable) {
        res.status(400);
        throw new Error("Admin already registered!");
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
        name,
        email,
        password: hashedPassword,
    });

    console.log(`Admin created ${admin}`);
    if (admin) {
        res.status(201).json({ _id: admin.id, email: admin.email });
    } else {
        res.status(400);
        throw new Error("Admin data is not valid");
    }
    res.json({ message: "Register the admin" });
});

// @desc Login user
// @route POST /api/users/login
// @access public
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const admin = await Admin.findOne({ email });
    //compare password with hashedpassword
    if (admin && (await bcrypt.compare(password, admin.password))) {
        const accessToken = jwt.sign(
            {
                admin: {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email,
                },
            },
            process.env.ACCESS_TOKEN_SECERT,
            { expiresIn: "24h" }
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("email or password is not valid");
    }
});

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentAdmin = asyncHandler(async (req, res) => {
    // console.log(req.user)
    res.json(req.admin);
});

// UPDATE
const updateEvent = asyncHandler(async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
        const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(event);
    }
    catch (err) {
        console.log(err);
    }


})

// DELETE
const deleteEvent = asyncHandler(async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
        const event = await Event.findByIdAndDelete(id);

        console.log(event)
        res.status(200).json(event);
    }
    catch (err) {
        console.log(err);
    }
})

// CREATE
const addEvent = asyncHandler(async (req, res) => {
    const { title, poster, originalPrice, discountedPrice, city, eventID } = req.body;

    const event = new Event();
    event.title = title;
    event.originalPrice = originalPrice;
    event.discountedPrice = discountedPrice;
    event.poster = poster;
    event.city = city;
    event.eventID = eventID;


    let error = "";
    try {
        await event.validate();
    } catch (err) {
        console.log(err.message.split(":")[2])
        console.log(err.message);
        error = err;
    }

    if (error) {
        res.status(400);
        throw new Error(error.message.split(": ")[2])
    }

    const eventAvailable = await Event.findOne({ title, city });
    if (eventAvailable) {
        res.status(400);
        throw new Error("This event already exists!");
    }

    const newevent = await Event.create({
        title,
        city,
        originalPrice,
        discountedPrice,
        poster,
        eventID

    });

    console.log(`New Featured event created ${newevent}`);
    if (newevent) {
        console.log("new features")
        res.status(201).json({
            _id: newevent.id,
            title: newevent.title,
            city: newevent.city,
            poster: newevent.poster,
            discountedPrice: newevent.discountedPrice,
            originalPrice: newevent.originalPrice,
            eventID: newevent.eventID,

        });
    } else {
        res.status(400);
        throw new Error("Event data is not valid");
    }
    res.json({ message: "Add a event!" });

})

const getallevents = async (req, res) => {

    const data = await Event.find();

    if (data) {
        res.status(200).json(data);
    }
    else {
        res.status(400).json({ "message": "No data to display!" });
    }
}

const getAllEventRegis = async (req, res) => {
    const data = await EventRegis.find();

    if (data) {
        res.status(200).json(data);
    }
    else {
        res.status(400).json({ "message": "No data to display!" });
    }
}

const particularEventRegis = async (req, res) => {

    const eventID = req.query.eventID

    const data = await EventRegis.find({ eventID: eventID });

    if (data) {
        res.status(200).json(data);
    }
    else {
        res.status(400).json({ "message": "No data to display!" });
    }
}

const updateEventRegis = async (req, res) => {
    const id = req.query.id;
    console.log(id)
    try {
        const eventregis = await EventRegis.findByIdAndUpdate(id, {
            "used": "true"
        }, { new: true });

        console.log(eventregis)
        res.status(200).json(eventregis);
    }
    catch (err) {
        console.log(err);
    }
}

const updateCoordinator = async (req, res) => {
    const id = req.query.id;
    const events = req.body.events;
    console.log(id, events);
    try {
        const coord = await Coordinator.findByIdAndUpdate(id, {
            "events": events
        }, { new: true });

        console.log(coord)
        res.status(200).json(coord);
    }
    catch (err) {
        console.log(err);
    }


}

const getCoordinator = async (req, res) => {
    const id = req.query.id;
    console.log(id);

    try {
        const coord = await Coordinator.find({ _id: id });

        console.log(coord)
        res.status(200).json(coord);
    }
    catch (err) {
        console.log(err);
    }
}


module.exports = { registerAdmin, loginAdmin, currentAdmin, updateEvent, deleteEvent, addEvent, getallevents, updateEventRegis, getAllEventRegis, particularEventRegis,updateCoordinator,getCoordinator };