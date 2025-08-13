const express = require('express');
const { createBooking, getBookingData } = require('../controller/booking.controller');
const { isAuth } = require('../middleware/isAuth');
const {  cancleBooking} = require('../controller/booking.controller');


const bookingRouter = express.Router();

bookingRouter.post('/add/:id', isAuth,createBooking); 
bookingRouter.delete('/cancle/:id', isAuth, cancleBooking);
bookingRouter.get('/my', isAuth, getBookingData);

module.exports = bookingRouter;