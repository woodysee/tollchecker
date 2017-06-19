import mongoose from "mongoose";

const chargesSchema = new mongoose.schema({
  vehicleType: String,
  dayType: String,
  gantryIDs: [Gantry], /*gantrySchemas*/
  startTime: Number,
  endTime: Number,
  chargeAmount: Number
});

const Charges = mongoose.model('Charges', chargesSchema);
