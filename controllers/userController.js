const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  // if (!name || !email || !password) {
  //     res.status(400);
  //     throw new Error("All fields are mandatory!");
  // }

  const pat = new User();
  pat.name = name;
  pat.email = email;
  pat.password = password;
  pat.isAdmin = isAdmin;

  let error = '';
  try {
    await pat.validate();
  } catch (err) {
    console.log(err.message.split(':')[2]);
    error = err;
  }

  if (error) {
    res.status(400);
    throw new Error(error.message.split(': ')[2]);
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error('User already registered!');
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    isAdmin,
    password: hashedPassword,
  });

  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error('User data us not valid');
  }
  res.json({ message: 'Register the user' });
});

// @desc Login user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('All fields are mandatory!');
  }
  const user = await User.findOne({ email });
  //compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          id: user.id,
          name: user.name,
          isAdmin: user.isAdmin,
          email: user.email,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: '15m' }
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
const currentUser = asyncHandler(async (req, res) => {
  // console.log(req.user)
  res.json(req.user);
});

const getCoordinatorEvents = async (req, res) => {
  const id = req.params.id;
  const data = await User.find(id);

  if (events) {
    res.status(200).json(data.events);
  } else {
    console.log('No events to show !');
  }
};

module.exports = { registerUser, loginUser, currentUser, getCoordinatorEvents };
