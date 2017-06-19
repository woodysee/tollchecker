const mongoose = require('mongoose');

const gantrySchema = new mongoose.Schema({
  gantryID: String,
  locationDescription: String,
  gantryZone: String,
  zoneID: String,
  dayType: String,
  charge: {
    chargeTimeStart: Number,
    chargeTimeEnd: Number,
    chargeAmount: Number
  },

  profile: {
    name: String,
    gender: String,
    location: String,
    website: String,
    picture: String
  }
}, { timestamps: true });
