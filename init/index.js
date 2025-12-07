// const mongoose = require('mongoose');
// const initData = require('./data.js');
// const Listing = require('../models/listing');

// async function main(){
//     await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");
// }
// main().then((res)=>{
//     console.log("DB connection established");
// }).catch((err)=>{
//     console.log("Error: " , err);
// });

// const initDB = async () => {
//   await Listing.deleteMany({});
//   initData.data = initData.data.map((obj)=>({...obj, owner : "69305449a403a6a8175613e5"}));
//   await Listing.insertMany(initData.data);
//   console.log("data was initialized");
// };

// initDB();

const mongoose = require("mongoose");
const axios = require("axios");
const initData = require("./data.js");
const Listing = require("../models/listing");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");
}
main()
  .then(() => console.log("DB connection established"))
  .catch((err) => console.log("Error:", err));


// 🔥 Function to convert location → GeoJSON (OpenStreetMap)
async function geocodeLocation(place) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`;

  const res = await axios.get(url, {
    headers: { "User-Agent": "wonderlust-app" }
  });

  if (!res.data.length) return null;

  const lat = parseFloat(res.data[0].lat);
  const lon = parseFloat(res.data[0].lon);

  return {
    type: "Point",
    coordinates: [lon, lat]
  };
}


// 🔥 Seed function
const initDB = async () => {
  await Listing.deleteMany({});
  console.log("Old data removed");

  for (let item of initData.data) {
    console.log(`📍 Geocoding: ${item.location}`);

    const geometry = await geocodeLocation(item.location);

    if (!geometry) {
      console.log(`❌ Skipping ${item.title} (No geocode result)`);
      continue;
    }

    const newListing = new Listing({
      ...item,
      owner: "69305449a403a6a8175613e5",
      geometry: geometry,
    });

    await newListing.save();
    console.log(`✔ Saved: ${newListing.title}`);
  }

  console.log("🎉 All listings seeded successfully!");
  mongoose.connection.close();
};

initDB();
