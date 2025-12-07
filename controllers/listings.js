const Listing = require("../models/listing"); 
const axios = require('axios'); // we'll use OpenStreetMap's Nominatim API via axios for geocoding

const geocodeLocation = async (query) => {
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
    const response = await axios.get(geocodeUrl, {
        headers: { 'User-Agent': 'wonderlust-app' }
    });

    if (!response.data.length) {
        const error = new Error("Location not found");
        error.name = "GeocodeError";
        throw error;
    }

    const lat = parseFloat(response.data[0].lat);
    const lon = parseFloat(response.data[0].lon);

    return {
        type: "Point",
        coordinates: [lon, lat]
    };
};

module.exports.index = async (req,res)=>{
    const allListings =  await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}


module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
}



module.exports.showListing = (async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path : 'reviews' , 
        populate : {
        path : "author",
    }
})
.populate("owner"); 
    if(!listing){
        req.flash('error', 'Listing Not Found!');
        return res.redirect('/listings');
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
});



// module.exports.createListing = (async (req,res, next)=>{
//     let url  = req.file.path;
//     let filename = req.file.filename;   
//     // let {title, description, image, price, country, location} = req.body;
//     const newListing = new Listing(req.body.listing);
//     newListing.owner = req.user._id;
//     newListing.image = { url, filename };
//     await newListing.save();
//     req.flash('success', 'New Listing Created Successfully!');
//     // console.log(newListing);
//     res.redirect("/listings");
// })




module.exports.createListing = async (req, res, next) => {
    try {
        let url = req.file.path;
        let filename = req.file.filename;

        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = { url, filename };

        newListing.geometry = await geocodeLocation(req.body.listing.location);

        let savedListing = await newListing.save();
        console.log("SAVED LISTING:", savedListing);

        req.flash('success', 'New Listing Created Successfully!');
        res.redirect("/listings");

    } catch (e) {
        if (e.name === "GeocodeError") {
            req.flash("error", "Location not found!");
            return res.redirect("/listings/new");
        }
        next(e);
    }
};









module.exports.editListing = (async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id); 
       if(!listing){
        req.flash('error', 'Listing Not Found!');
        return res.redirect('/listings');
    }

   let originalImageUrl =  listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250"); // resizing image using cloudinary url manipulation

    res.render("listings/edit.ejs", { listing, originalImageUrl });
})

module.exports.updateListing = async (req, res) => {
    try {
        let { id } = req.params;
        
        // If image field is blank, remove it so default applies
        if (req.body.listing.image === "") {
            req.body.listing.image = undefined;
        }

        // First get the old listing to check if location changed
        const oldListing = await Listing.findById(id);
        
        // Update the listing
        let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { runValidators: true, new: true, runSettersOnQuery: true });
        
        // Update image if new file uploaded
        if (typeof req.file !== 'undefined') {
            let url = req.file.path;
            let filename = req.file.filename;
            listing.image = { url, filename };
        }

        // Update geometry if location changed
        if (oldListing.location !== req.body.listing.location) {
            listing.geometry = await geocodeLocation(req.body.listing.location);
        }

        await listing.save();
        
        req.flash('success', 'Listing Updated Successfully!');
        res.redirect(`/listings/${id}`);
    } catch (e) {
        if (e.name === "GeocodeError") {
            req.flash("error", "Location not found!");
            return res.redirect(`/listings/${req.params.id}/edit`);
        }
        throw e;
    }
}

module.exports.deleteListing = (async(req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash('success', 'Listing Deleted Successfully!');
    res.redirect("/listings");
})