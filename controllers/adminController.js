const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');
const Event = require('../models/eventModel');
const Coordinator = require('../models/coordinatorModel');
const EventRegis = require('../models/eventregisModel');
const Venue = require('../models/venueModel');
const Article = require('../models/articleModel');

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

  let error = '';
  try {
    await admin1.validate();
  } catch (err) {
    console.log(err.message.split(':')[2]);
    error = err;
  }

  if (error) {
    res.status(400);
    throw new Error(error.message.split(': ')[2]);
  }

  const adminAvailable = await Admin.findOne({ email });
  if (adminAvailable) {
    res.status(400);
    throw new Error('Admin already registered!');
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await Admin.create({
    name,
    email,
    password: hashedPassword,
  });

  if (admin) {
    res.status(201).json({ _id: admin.id, email: admin.email });
  } else {
    res.status(400);
    throw new Error('Admin data is not valid');
  }
  res.json({ message: 'Register the admin' });
});

// @desc Login user
// @route POST /api/users/login
// @access public
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('All fields are mandatory!');
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
      { expiresIn: '24h' }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error('email or password is not valid');
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
  try {
    const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(event);
  } catch (err) {
    console.log(err);
  }
});

// DELETE
const deleteEvent = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const event = await Event.findByIdAndDelete(id);

    res.status(200).json(event);
  } catch (err) {
    console.log(err);
  }
});

// CREATE
const addEvent = asyncHandler(async (req, res) => {
  const {
    title,
    poster,
    originalPrice,
    discountedPrice,
    city,
    venue,
    eventID,
    eventDate,
    quantity,
    description,
    payAtVenue, // Add the new field here
  } = req.body;

  const event = new Event();
  event.title = title;
  event.originalPrice = originalPrice;
  event.discountedPrice = discountedPrice;
  event.poster = poster;
  event.city = city;
  event.venue = venue;
  event.eventID = eventID;
  event.eventDate = eventDate;
  event.quantity = quantity;
  event.description = description;
  event.payAtVenue = payAtVenue; // Set the new field here

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
    venue,
    originalPrice,
    discountedPrice,
    poster,
    eventID,
    eventDate,
    quantity,
    description,
    payAtVenue, // Include the new field here
  });

  if (newevent) {
    res.status(201).json({
      _id: newevent.id,
      title: newevent.title,
      city: newevent.city,
      venue: newevent.venue,
      poster: newevent.poster,
      discountedPrice: newevent.discountedPrice,
      originalPrice: newevent.originalPrice,
      eventID: newevent.eventID,
      evenDate: newevent.eventDate,
      quantity: newevent.quantity,
      description: newevent.description,
      payAtVenue: newevent.payAtVenue, // Include the new field here
    });
  } else {
    res.status(400);
    throw new Error('Event data is not valid');
  }
  res.json({ message: 'Add an event!' });
});


const getallevents = async (req, res) => {
  const data = await Event.find();

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(400).json({ message: 'No data to display!' });
  }
};

const getAllEventRegis = async (req, res) => {
  const data = await EventRegis.find();

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(400).json({ message: 'No data to display!' });
  }
};

const particularEventRegis = async (req, res) => {
  const eventID = req.query.eventID;

  const data = await EventRegis.find({ eventID: eventID });

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(400).json({ message: 'No data to display!' });
  }
};

const addFeaturedEvent = async (req, res) => {
  const id = req.query.id;

  try {
    const data = await Event.findByIdAndUpdate(
      id,
      {
        featuredEvent: true,
      },
      {
        new: true
      }
    )

    res.status(200).json(data);

  } catch (error) {
    console.log(error)
  }


}
const removeFeaturedEvent = async (req, res) => {
  const id = req.query.id;

  try {
    const data = await Event.findByIdAndUpdate(
      id,
      {
        featuredEvent: false,
      },
      {
        new: true
      }
    )

    res.status(200).json(data);

  } catch (error) {
    console.log(error)
  }


}

const updateEventRegis = async (req, res) => {
  const id = req.query.id;
  try {
    const eventregis = await EventRegis.findByIdAndUpdate(
      id,
      {
        used: 'true',
      },
      { new: true }
    );

    res.status(200).json(eventregis);
  } catch (err) {
    console.log(err);
  }
};

const updateCoordinator = async (req, res) => {
  const id = req.query.id;
  const events = req.body.events;
  try {
    const coord = await Coordinator.findByIdAndUpdate(
      id,
      {
        events: events,
      },
      { new: true }
    );

    res.status(200).json(coord);
  } catch (err) {
    console.log(err);
  }
};

const getCoordinator = async (req, res) => {
  const id = req.query.id;

  try {
    const coord = await Coordinator.find({ _id: id });

    res.status(200).json(coord);
  } catch (err) {
    console.log(err);
  }
};

const CoordinatorEvents = async (req, res) => {
  try {
    const data = await Coordinator.find({}).select('name events');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
};

const addVenue = asyncHandler(async (req, res) => {
  const { name, pinCode, city, address } = req.body;

  const newVenue = await Venue.create({
    name,
    pinCode,
    city,
    address,
  });

  if (newVenue) {
    res.status(201).json({
      _id: newVenue.id,
      name: newVenue.name,
      pinCode: newVenue.pinCode,
      city: newVenue.city,
      address: newVenue.address,
    });
  } else {
    res.status(400);
    throw new Error('Venue data is not valid');
  }
});

const getAllVenue = asyncHandler(async (req, res) => {
  try {
    const data = await Venue.find({});
    res.json(data).status(201);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
});

const addArticle = asyncHandler(async (req, res) => {
  const { title, content,category, poster } = req.body;

  const newArticle = await Article.create({
    title,
    content,
    category,
    poster,
    date: new Date(),
  });

  if (newArticle) {
    res.status(201).json({
      _id: newArticle.id,
      title: newArticle.title,
      content: newArticle.content,
      category: newArticle.category,
      poster: newArticle.poster,
      date: newArticle.date,
    });
  } else {
    res.status(400);
    throw new Error('Article is not valid');
  }
});

const getAllArticle = asyncHandler(async (req, res) => {
  try {
    const data = await Article.find({});
    res.json(data).status(201);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
});

const deleteArticle = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const article = await Article.findByIdAndDelete(id);

    res.status(200).json(article);
  } catch (err) {
    console.log(err);
  }
});

module.exports = {
  registerAdmin,
  loginAdmin,
  currentAdmin,
  updateEvent,
  deleteEvent,
  addEvent,
  addFeaturedEvent,
  removeFeaturedEvent,
  getallevents,
  updateEventRegis,
  getAllEventRegis,
  particularEventRegis,
  updateCoordinator,
  getCoordinator,
  CoordinatorEvents,
  addVenue,
  getAllVenue,
  addArticle,
  getAllArticle,
  deleteArticle
};
