const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const Listing = require('../models/listing');
const { isLoggedIn , isOwner , validateListing } = require('../middleware.js');
const listingController = require("../controllers/listings.js")
const multer  = require('multer')
const {storage} = require('../cloudConfig.js');
const upload = multer({ storage }); 


router
  .route("/")
  .get( wrapAsync(listingController.index)) // all listings route (index route)
  .post( 
    isLoggedIn, 
    upload.single('listing[image]'),
    validateListing,
    wrapAsync (listingController.createListing)); // create route


// new route 
router.get("/new", isLoggedIn, listingController.renderNewForm); 

router
   .route("/:id")
   .get( wrapAsync(listingController.showListing))// view specific listing (show route)
   .put( isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync (listingController.updateListing)) // update route
   .delete( isLoggedIn, isOwner, wrapAsync (listingController.deleteListing)); // delete route

   
// edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync (listingController.editListing));


module.exports = router;