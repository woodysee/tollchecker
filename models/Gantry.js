import mongoose from "mongoose";

const gantrySchema = new mongoose.schema({
  gantryID: {type: String, unique: true},
  locationDescription: String,
  gantryType: {gantryZone: String, zoneID: String},
});

const Gantry = mongoose.model('Gantry', gantrySchema);
