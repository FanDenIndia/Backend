const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Coordinator = require('../models/coordinatorModel');
const EventRegis = require('../models/eventregisModel');
const Event = require('../models/eventModel');

const registerCoordinator = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const coordinator1 = new Coordinator();
  coordinator1.name = name;
  coordinator1.email = email;
  coordinator1.password = password;

  let error = '';
  try {
    await coordinator1.validate();
  } catch (err) {
    console.log(err.message.split(':')[2]);
    error = err;
  }

  if (error) {
    res.status(400);
    throw new Error(error.message.split(': ')[2]);
  }

  const coordinatorAvailable = await Coordinator.findOne({ email });
  if (coordinatorAvailable) {
    res.status(400);
    throw new Error('Coordinator already registered!');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const coordinator = await Coordinator.create({
    name,
    email,
    password: hashedPassword,
  });

  console.log(`Coordinator created ${coordinator}`);
  if (coordinator) {
    res.status(201).json({ _id: coordinator.id, email: coordinator.email });
  } else {
    res.status(400);
    throw new Error('Coordinator data is not valid');
  }
  res.json({ message: 'Register the coordinator' });
});

const loginCoordinator = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('All fields are mandatory!');
  }
  const coordinator = await Coordinator.findOne({ email });
  //compare password with hashedpassword
  if (coordinator && (await bcrypt.compare(password, coordinator.password))) {
    const accessToken = jwt.sign(
      {
        coordinator: {
          id: coordinator.id,
          name: coordinator.name,
          email: coordinator.email,
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

const currentCoordinator = asyncHandler(async (req, res) => {
  // console.log(req.user)
  res.json(req.coordinator);
});

const coordinatorEventRegis = asyncHandler(async (req, res) => {
  const id = req.query.id;
  const data = await Coordinator.find({ _id: id });
  //   console.log('Login Data', data);
  //   console.log(data);

  const event = data[0].events;
  const events = event[0].split(',');
  console.log(events);

  const regis = [];

  events.forEach(async (e, i) => {
    // console.log(e)
    const ev = await Event.find({ eventID: e });
    console.log('ev = ', ev[0]);

    const regi = await EventRegis.find({ eventID: e });
    console.log(regi);

    const obj = {
      eventTitle: ev[0].title,
      eventID: ev[0].eventID,
      registrations: regi,
    };

    console.log('obj = ', obj);

    regis.push(obj);

    console.log(regis);

    if (i == events.length - 1) {
      if (regis.length != 0) {
        res.status(200).json({ data: regis });
      } else {
        res.status(400).json({ message: 'No data to display!' });
      }
    }
  });
});

const updateEventRegis = async (req, res) => {
  const id = req.query.id;
  console.log(id);
  try {
    const eventregis = await EventRegis.findByIdAndUpdate(
      id,
      {
        used: 'true',
      },
      { new: true }
    );

    console.log(eventregis);
    res.status(200).json(eventregis);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  registerCoordinator,
  loginCoordinator,
  currentCoordinator,
  updateEventRegis,
  coordinatorEventRegis,
};
