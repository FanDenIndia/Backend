const express = require('express');
const connectDb = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const qr = require('qrcode');

connectDb();

const app = express();
app.use(cors());

const port = process.env.PORT || 5001;

// app.use(cookieParser())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to backend');
});
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/coordinator', require('./routes/coordinatorRoutes'));
app.use('/api/marketing', require('./routes/marketingRoutes'));
app.use('/api/event', require('./routes/eventRoutes'));
app.use('/api/eventregis', require('./routes/eventregisRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/order', require('./routes/orderRoutes'));
app.use('/api/promoter', require('./routes/promoterRoutes'));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
