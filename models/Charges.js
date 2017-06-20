import mongoose from "mongoose";

const chargesSchema = new mongoose.Schema({
  vehicleType: String,
  dayType: String,
  gantryIDs: [], /*gantrySchemas*/
  startHour: Number,
  startMins: Number,
  endHour: Number,
  endMins: Number,
  chargeAmount: Number
});

const Charges = mongoose.model('Charges', chargesSchema);
module.exports = Charges;
