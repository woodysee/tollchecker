import mongoose from "mongoose";

const gantrySchema = new mongoose.schema({
  gantryID: {
    id: String,
    required: true,
    unique: true
  },
  locationDescription: String,
  dayType: String,
  gantryType: {
    gantryZone: String,
    zoneID: String
  }
});

const Gantry = mongoose.model('Gantry', gantrySchema);
module.exports = Gantry;
