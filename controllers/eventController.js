const asyncHandler = require('express-async-handler');
const Event = require('../models/eventModel');

// CREATE
const addEvent = asyncHandler(async (req, res) => {
  const {
    title,
    poster,
    originalPrice,
    discountedPrice,
    city,
    venue,
    quantity,
  } = req.body;

  const event = new Event();
  event.title = title;
  event.originalPrice = originalPrice;
  event.discountedPrice = discountedPrice;
  event.poster = poster;
  event.city = city;
  event.venue = venue;
  event.quantity = quantity;

  let error = '';
  try {
    await event.validate();
  } catch (err) {
    console.log(err.message.split(':')[2]);
    console.log(err.message);
    error = err;
  }

  if (error) {
    res.status(400);
    throw new Error(error.message.split(': ')[2]);
  }

  const eventAvailable = await Event.findOne({ title, city });
  if (eventAvailable) {
    res.status(400);
    throw new Error('This event already exists!');
  }

  const newevent = await Event.create({
    title,
    city,
    originalPrice,
    discountedPrice,
    poster,
    venue,
    quantity,
  });

  console.log(`New Featured event created ${newevent}`);
  if (newevent) {
    console.log('new features');
    res.status(201).json({
      _id: newevent.id,
      title: newevent.title,
      city: newevent.city,
      venue: newevent.venue,
      poster: newevent.poster,
      discountedPrice: newevent.discountedPrice,
      originalPrice: newevent.originalPrice,

      quantity: newevent.quantity,
    });
  } else {
    res.status(400);
    throw new Error('Event data is not valid');
  }
  res.json({ message: 'Add a event!' });
});

// READ
const getEvent = asyncHandler(async (req, res) => {
  console.log(req.query);
  const data = await Event.find(req.query);

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(400).json({ message: 'No data to display!' });
  }
});

const getPastEvent = asyncHandler(async (req, res) => {
  let pastEvent = [];
  const today = new Date();
  const data = await Event.find();
  data.map((eventData) => {
    if (today > eventData.eventDate) {
      pastEvent.push(eventData);
    }
  });

  if (data) {
    res.status(200).json(pastEvent);
  } else {
    res.status(400).json({ message: 'No data to display!' });
  }
});

const getUpcomingEvent = asyncHandler(async (req, res) => {
  let upcomingEvent = [];
  const today = new Date();
  const data = await Event.find();
  data.map((eventData) => {
    if (today < eventData.eventDate) {
      upcomingEvent.push(eventData);
    }
  });

  if (data) {
    res.status(200).json(upcomingEvent);
  } else {
    res.status(400).json({ message: 'No data to display!' });
  }
});

module.exports = { getEvent, addEvent, getPastEvent, getUpcomingEvent };
