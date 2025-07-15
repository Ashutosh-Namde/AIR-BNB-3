const express = require('express');
const { isAuth } = require('../middleware/isAuth');
const upload = require('../middleware/multer');
const { getAllListing } = require('../controller/listing.controller');
const { addListing } = require('../controller/listing.controller');

const listingRouter = express.Router();

listingRouter.post('/add', isAuth ,upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 }
]),addListing)

listingRouter.get('/allListing', getAllListing);


module.exports = listingRouter

