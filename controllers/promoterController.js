const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const Promoter = require("../models/promoterModel");

const registerPromoter = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user already exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.isPromoter) {
      return res.status(400).json({ success: false, message: "User is already a promoter" });
    }

    // Set isPromoter to true for the user
    user.isPromoter = true;
    await user.save();

    // Create a new Promoter entry with the same email
    const promoter = new Promoter({details:user._id});
    await promoter.save();

    res.status(200).json({ success: true, message: "User registered as a promoter" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

const getAllPromoters = asyncHandler(async (req, res) => {
  try {
    const promoters = await Promoter.find().populate("details","-password").populate("registrations");
    
    if (!promoters || promoters.length === 0) {
      return res.status(404).json({ success: false, message: "No promoters found" });
    }

    res.status(200).json({ success: true, promoters });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = { registerPromoter, getAllPromoters };
