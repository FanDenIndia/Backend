const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');

const createOrder = async (req, res) => {
  const { productName, quantity, userName, userEmail, userAddress, userPhone, paymentId } = req.body;
  const old = await Order.find({ paymentId: paymentId });
  if (old) {
    res.status(400).json({ message: 'Order already placed!' });
  }
  else {


    const neworder = await Order.create({
      productName: productName,
      quantity: quantity,
      userName: userName,
      userEmail: userEmail,
      userPhone: userPhone,
      userAddress: userAddress,
      paymentId: paymentId,
      orderDate: new Date(),
    });

    if (neworder) {
      res
        .status(201)
        .json({ _id: neworder._id, productName: neworder.productName });
    } else {
      res.status(400);
      throw new Error('User data us not valid');
    }
  }
};

const cancelOrder = async (req, res) => {
  const { orderID } = req.body;
  const order = await Order.findOneAndUpdate(
    { _id: orderID },
    { order_status: 'Cancelled' }
  );

  if (order) {
    res.status(201).json({ orderID: order._id, message: 'Order Cancelled!' });
  } else {
    res.status(400);
    throw new Error('Error in cancelling order!');
  }
};

const getAllOrder = async (req, res) => {
  const order = await Order.find();

  if (order) {
    res.status(201).json(order);
  } else {
    res.status(400);
    throw new Error('Error in fetching orders!');
  }
};
module.exports = {
  createOrder,
  cancelOrder,
  getAllOrder,
};
