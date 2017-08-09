console.log("Starting models/charges.js");
import mongoose from "mongoose";

const chargesSchema = new mongoose.Schema({
  vehicleType: String,
  dayType: String,
  gantryIDs: [],
  startHour: Number,
  startMins: Number,
  endHour: Number,
  endMins: Number,
  chargeAmount: Number
});

//check for the database
const Charges = mongoose.model('Charges', chargesSchema);

var charges = Charges.find({});

// charges.
//   find('gantryIDs').in([Gantry.gantryID]).
//   where('dayType').equals(isWeekday()).
//   where('startHour').equals(currentHour()).
//   where('startMins').lte(currentMins()).gt(currentMins()).
//   exec(callback);

//define schema method
chargesSchema.methods.getCurrentCharges = function() {
  const charges = this;
  /* Conditional to check current time, correct gantryIDs */
  
  return charges[id].chargeAmount;
};

module.exports = Charges;
//meteor to reference MongoDB?? - KIV

console.log("Loaded models/charges.js");
