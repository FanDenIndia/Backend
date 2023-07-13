const asyncHandler = require("express-async-handler");
const Event = require("../models/eventModel");

// CREATE
const addEvent = asyncHandler(async (req, res) => {
    const { title, poster, originalPrice, discountedPrice, city} = req.body;

    const event = new Event();
    event.title = title;
    event.originalPrice = originalPrice;
    event.discountedPrice = discountedPrice;
    event.poster = poster;
    event.city = city;
    

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
        poster
        
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
            
        });
    } else {
        res.status(400);
        throw new Error("Event data is not valid");
    }
    res.json({ message: "Add a event!" });

})

// READ
const getEvent = asyncHandler(async (req, res) => {

    const data = await Event.find(req.query);

    if (data) {
        res.status(200).json(data);
    }
    else {
        res.status(400).json({ "message": "No data to display!" });
    }

})



module.exports = { getEvent,addEvent }