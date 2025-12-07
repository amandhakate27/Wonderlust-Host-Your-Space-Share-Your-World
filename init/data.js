// FINAL UPDATED DATA WITH ACCURATE GEO-FRIENDLY LOCATIONS

const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views.",
    image: {
      filename: "image-1.jpg",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60"
    },
    price: 1500,
    location: "Malibu, California",
    country: "United States"
  },

  {
    title: "Modern Loft in Downtown",
    description: "Stay in the heart of the city in this stylish loft apartment.",
    image: {
      filename: "image-2.jpg",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60"
    },
    price: 1200,
    location: "Manhattan, New York",
    country: "United States"
  },

  {
    title: "Mountain Retreat",
    description: "Peaceful mountain cabin surrounded by nature.",
    image: {
      filename: "image-3.jpg",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60"
    },
    price: 1000,
    location: "Aspen, Colorado",
    country: "United States"
  },

  {
    title: "Historic Villa in Tuscany",
    description: "Experience the charm of Tuscany in this beautifully restored villa.",
    image: {
      filename: "image-4.jpg",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60"
    },
    price: 2500,
    location: "Florence, Tuscany",
    country: "Italy"
  },

  {
    title: "Secluded Treehouse Getaway",
    description: "Live among the treetops in this unique retreat.",
    image: {
      filename: "image-5.jpg",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60"
    },
    price: 800,
    location: "Portland, Oregon",
    country: "United States"
  },

  {
    title: "Beachfront Paradise",
    description: "Step out of your door onto the sandy beach.",
    image: {
      filename: "image-6.jpg",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60"
    },
    price: 2000,
    location: "Cancún, Quintana Roo",
    country: "Mexico"
  },

  {
    title: "Rustic Cabin by the Lake",
    description: "Serene lake cabin perfect for outdoor lovers.",
    image: {
      filename: "image-7.jpg",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=60"
    },
    price: 900,
    location: "Lake Tahoe, California",
    country: "United States"
  },

  {
    title: "Luxury Penthouse with City Views",
    description: "Panoramic city views from this modern penthouse.",
    image: {
      filename: "image-8.jpg",
      url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=800&q=60"
    },
    price: 3500,
    location: "Los Angeles, California",
    country: "United States"
  },

  {
    title: "Ski-In/Ski-Out Chalet",
    description: "Perfect winter getaway in the Swiss Alps.",
    image: {
      filename: "image-9.jpg",
      url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=60"
    },
    price: 3000,
    location: "Verbier, Valais",
    country: "Switzerland"
  },

  {
    title: "Safari Lodge in the Serengeti",
    description: "Witness the Great Migration up close.",
    image: {
      filename: "image-10.jpg",
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=60"
    },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania"
  },

  {
    title: "Historic Canal House",
    description: "Stay in a beautifully preserved canal house.",
    image: {
      filename: "image-11.jpg",
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=60"
    },
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands"
  },

  {
    title: "Private Island Retreat",
    description: "A full private island just for you.",
    image: {
      filename: "image-12.jpg",
      url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?auto=format&fit=crop&w=800&q=60"
    },
    price: 10000,
    location: "Fiji Islands",
    country: "Fiji"
  },

  {
    title: "Charming Cottage in the Cotswolds",
    description: "Cozy thatched-roof cottage in the Cotswolds.",
    image: {
      filename: "image-13.jpg",
      url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?auto=format&fit=crop&w=800&q=60"
    },
    price: 1200,
    location: "Bourton-on-the-Water, Cotswolds",
    country: "United Kingdom"
  },

  {
    title: "Historic Brownstone in Boston",
    description: "Elegant historic home in central Boston.",
    image: {
      filename: "image-14.jpg",
      url: "https://images.unsplash.com/photo-1533619239233-6280475a633a?auto=format&fit=crop&w=800&q=60"
    },
    price: 2200,
    location: "Boston, Massachusetts",
    country: "United States"
  },

  {
    title: "Beachfront Bungalow in Bali",
    description: "Private pool + white sand beach.",
    image: {
      filename: "image-15.jpg",
      url: "https://images.unsplash.com/photo-1602391833977-358a52198938?auto=format&fit=crop&w=800&q=60"
    },
    price: 1800,
    location: "Bali",
    country: "Indonesia"
  },

  {
    title: "Mountain View Cabin in Banff",
    description: "Stunning views of the Canadian Rockies.",
    image: {
      filename: "image-16.jpg",
      url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?auto=format&fit=crop&w=800&q=60"
    },
    price: 1500,
    location: "Banff, Alberta",
    country: "Canada"
  },

  {
    title: "Art Deco Apartment in Miami",
    description: "Stylish stay in Miami Beach.",
    image: {
      filename: "image-17.jpg",
      url: "https://plus.unsplash.com/premium_photo-1670963964797-942df1804579?auto=format&fit=crop&w=800&q=60"
    },
    price: 1600,
    location: "Miami Beach, Florida",
    country: "United States"
  },

  {
    title: "Tropical Villa in Phuket",
    description: "Private infinity pool with ocean views.",
    image: {
      filename: "image-18.jpg",
      url: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?auto=format&fit=crop&w=800&q=60"
    },
    price: 3000,
    location: "Phuket",
    country: "Thailand"
  },

  {
    title: "Historic Castle in Scotland",
    description: "Live like royalty in the Scottish Highlands.",
    image: {
      filename: "image-19.jpg",
      url: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?auto=format&fit=crop&w=800&q=60"
    },
    price: 4000,
    location: "Scottish Highlands",
    country: "United Kingdom"
  },

  {
    title: "Desert Oasis in Dubai",
    description: "Luxury home in the Dubai desert.",
    image: {
      filename: "image-20.jpg",
      url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=60"
    },
    price: 5000,
    location: "Dubai",
    country: "United Arab Emirates"
  },

  {
    title: "Rustic Log Cabin in Montana",
    description: "Quiet cabin surrounded by nature.",
    image: {
      filename: "image-21.jpg",
      url: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?auto=format&fit=crop&w=800&q=60"
    },
    price: 1100,
    location: "Montana",
    country: "United States"
  },

  {
    title: "Beachfront Villa in Greece",
    description: "Crystal blue water + whitewashed villas.",
    image: {
      filename: "image-22.jpg",
      url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=800&q=60"
    },
    price: 2500,
    location: "Mykonos",
    country: "Greece"
  },

  {
    title: "Eco-Friendly Treehouse Retreat",
    description: "Eco-friendly living in the rainforest.",
    image: {
      filename: "image-23.jpg",
      url: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?auto=format&fit=crop&w=800&q=60"
    },
    price: 750,
    location: "Monteverde",
    country: "Costa Rica"
  },

  {
    title: "Historic Cottage in Charleston",
    description: "Beautiful restored cottage with a private garden.",
    image: {
      filename: "image-24.jpg",
      url: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?auto=format&fit=crop&w=800&q=60"
    },
    price: 1600,
    location: "Charleston, South Carolina",
    country: "United States"
  },

  {
    title: "Modern Apartment in Tokyo",
    description: "Central Tokyo apartment in Shinjuku.",
    image: {
      filename: "image-25.jpg",
      url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=800&q=60"
    },
    price: 2000,
    location: "Shinjuku, Tokyo",
    country: "Japan"
  },

  {
    title: "Lakefront Cabin in New Hampshire",
    description: "Relax by the peaceful mountain lake.",
    image: {
      filename: "image-26.jpg",
      url: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?auto=format&fit=crop&w=800&q=60"
    },
    price: 1200,
    location: "White Mountains, New Hampshire",
    country: "United States"
  },

  {
    title: "Luxury Villa in the Maldives",
    description: "Overwater villa with ocean views.",
    image: {
      filename: "image-27.jpg",
      url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=60"
    },
    price: 6000,
    location: "Maldives",
    country: "Maldives"
  },

  {
    title: "Ski Chalet in Aspen",
    description: "Luxury chalet right by the slopes.",
    image: {
      filename: "image-28.jpg",
      url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=60"
    },
    price: 4000,
    location: "Aspen, Colorado",
    country: "United States"
  },

  {
    title: "Secluded Beach House in Costa Rica",
    description: "Private beach house in a tropical paradise.",
    image: {
      filename: "image-29.jpg",
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=60"
    },
    price: 1800,
    location: "Santa Teresa Beach",
    country: "Costa Rica"
  }
];

module.exports = { data: sampleListings };
