const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const Promoter = require("../models/promoterModel");

const registerPromoter = asyncHandler(async (req, res) => {
  const { email, event } = req.body;

  try {
    // Check if the user already exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.isPromoter = true;
    await user.save();

    const existing = await Promoter.findOne({ details: user._id, event: event }).populate("details", "-password").populate("event");
    if (existing) {

      return res.status(200).json({ success: true, data: existing })

    }

    const promoter = new Promoter({ details: user._id, event: event });

    await promoter.save()

    const data = await Promoter.findOne({ details: user._id, event: event }).populate("details", "-password").populate("event");

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

const getAllPromoters = asyncHandler(async (req, res) => {
  try {
    const promoters = await Promoter.find().populate("details", "-password").populate("registrations").populate("event");

    if (!promoters || promoters.length === 0) {
      return res.status(404).json({ success: false, message: "No promoters found" });
    }

    res.status(200).json({ success: true, promoters });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

const addEventRegis = asyncHandler(async (req, res) => {
  const { event, id,regisId } = req.body;

  try {
    const regis = await Promoter.findById(id);
    if(!regis) return res.status(400).json({success:false , message:"User not a Promoter"});
    console.log(regis)
    const resp = regis.registrations;
    console.log(resp)

    const data = await Promoter.findOneAndUpdate({event,_id:id} , {registrations:[...resp,regisId]} , {
      returnOriginal:false
    });

    if(!data) return res.status(400).json({success:false , message:"Some error occured"});

    res.status(200).json({success:true , data});

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
})

module.exports = { registerPromoter, getAllPromoters, addEventRegis };
