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
app.use('/api/email', require('./routes/email'));
app.use('/api/event', require('./routes/eventRoutes'));
app.use('/api/eventregis', require('./routes/eventregisRoutes'));
app.use('/api/order', require('./routes/orderRoutes'));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
