const express = require('express');
const { isAuth } = require('../middleware/isAuth');
const upload = require('../middleware/multer');
const { getAllListing, findListing, updateListing, deleteListing } = require('../controller/listing.controller');
const { addListing } = require('../controller/listing.controller');

const listingRouter = express.Router();

listingRouter.post('/add', isAuth ,upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 }
]),addListing)

listingRouter.get('/allListing', getAllListing);

listingRouter.get('/find/:id', isAuth,findListing);

listingRouter.post('/update/:id', isAuth ,upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 }
]),updateListing)

listingRouter.delete('/delete/:id', isAuth, deleteListing);

module.exports = listingRouter

