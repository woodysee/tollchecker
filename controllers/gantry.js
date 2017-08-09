console.log("Starting controllers/gantry.js");
import Gantry from '../models/gantry'

// get all gantries
exports.getAll = (req, res) => {
  Gantry.find((err, gantries)=> {
    if (err) return res.json({message: 'could not find gantries because: ' + err})
    //console.log("console.log(Method for gantries here)");
    res.render('index', {
      gantries: gantries,
    })
  })
}

exports.getAllGantries = (req, res) => {
  Gantry.find((err, gantries)=> {
    if (err) return res.json({message: 'could not find gantries because: ' + err})
    //console.log(gantries)
    res.send(gantries)
  })
}

// get one gantry
exports.getOne = (req, res) => {
  let id = req.params.id

  Gantry.findById({_id: id}, (err, gantry) => {
    res.send('get one')
  })
}

// create one gantry
exports.create = (req, res) => {
  let newGantry = new Gantry()
  newGantry.gantryID = req.body.gantryID;
  newGantry.locationDescription = req.body.locationDescription;
  newGantry.daysCharged = req.body.daysCharged;
  newGantry.gantryType.gantryZone = req.body.gantryType.gantryZone;
  newGantry.gantryType.zoneID = req.body.gantryType.zoneID;

  newGantry.save((err, gantry) => {
    if (err) return res.json({message: 'could not save gantry because: ' + err})
    res.send('gantry created')
  });
}

// update one gantry
exports.update = (req, res) => {
  let id = req.params.id

  Gantry.findById({_id: id}, (err, gantry) => {
    gantry.gantryID = req.body.gantryID
    // ...
    gantry.save((err, gantry) => {
      if (err) return res.json({message: 'could not save user because: ' + err})
      res.send('gantry updated')
    });
  })
}


// delete on gantry
exports.delete = (req, res) => {
  let id = req.params.id

  Gantry.findById({_id: id}, (err, gantry) => {
    if (err) return res.json({message: 'could not find user because: ' + err})
    gantry.remove((err) => {
      if (err) return res.json({message: 'could not delete user because: ' + err})
      res.send('gantry deleted')
    })
  })
}
console.log("Loaded controllers/gantry.js");
