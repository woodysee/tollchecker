import Charges from '../models/charges'

// get all charges
exports.getAll = (req, res) => {
  Charges.find((err, charges)=> {
    if (err) return res.json({message: 'could not find charges because: ' + err})
    //console.log(charges)
    res.render('index', {
      charges: charges
    })
  })
}

exports.getAllCharges = (req, res) => {
  Charges.find((err, charges)=> {
    if (err) return res.json({message: 'could not find charges because: ' + err})
    //console.log(charges)
    res.send(charges)
  })
}

// get one charge
exports.getOne = (req, res) => {
  let id = req.params.id

  Charges.findById({_id: id}, (err, charge) => {
    res.send('get one')
  })
}

// create one charge
exports.create = (req, res) => {
  let newCharge = new Charges()
  newCharge.vehicleType = req.body.vehicleType;
  newCharge.dayType = req.body.dayType;
  newCharge.gantryIDs = req.body.gantryIDs;
  newCharge.startHour = req.body.startHour;
  newCharge.startMins = req.body.startMins;
  newCharge.endHour = req.body.endHour;
  newCharge.endMins = req.body.endMins;
  newCharge.chargeAmount = req.body.chargeAmount;

  newCharge.save((err, charge) => {
    if (err) return res.json({message: 'could not save charge because: ' + err})
    res.send('charge created')
  });
}

// update one charge
exports.update = (req, res) => {
  let id = req.params.id

  Charges.findById({_id: id}, (err, charge) => {
    charge.vehicleType = req.body.vehicleType;
    charge.dayType = req.body.dayType;
    charge.gantryIDs = req.body.gantryIDs;
    charge.startHour = req.body.startHour;
    charge.startMins = req.body.startMins;
    charge.endHour = req.body.endHour;
    charge.endMins = req.body.endMins;
    charge.chargeAmount = req.body.chargeAmount;
    charge.save((err, charge) => {
      if (err) return res.json({message: 'could not save charge because: ' + err})
      res.send('charge updated')
    });
  })
}


// delete on charge
exports.delete = (req, res) => {
  let id = req.params.id

  Charges.findById({_id: id}, (err, charge) => {
    if (err) return res.json({message: 'could not find charge because: ' + err})
    charge.remove((err) => {
      if (err) return res.json({message: 'could not delete charge because: ' + err})
      res.send('charge deleted')
    })
  })
}
