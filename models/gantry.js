import mongoose from "mongoose";

const gantrySchema = new mongoose.Schema({
  gantryID: String,
  locationDescription: String,
  daysCharged: String,
  gantryType: {
    gantryZone: String,
    zoneID: String
  }
});

const Gantry = mongoose.model('Gantry', gantrySchema);

module.exports = Gantry;
