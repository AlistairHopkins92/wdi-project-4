var Location = require("../models/location");
var User     = require("../models/user");

function locationsCreate(req, res){
  Location
  .findOne({ external_id: req.body.external_id })
  .then(function(location){
    // If there is no location in the db with this external_id, create one
    if (!location) {
      Location
      .create(req.body)
      .then(function(newLocation){
        // Have to use .id which is the string version of ObjectId
        return updateUsersLocation(req, res, newLocation);
      })
      .catch(function(err){
        return res.status(500).json({message: err});
      })
    } else {
      // else, update the current user's location (from req.user) 
      return updateUsersLocation(req, res, location);
    }
  })
  .catch(function(err){
    return res.status(500).json({message: err});
  })
}

function updateUsersLocation(req, res, location){
  User
  .findByIdAndUpdate(req.user._id, { location: location._id }, {
    new: true
  })
  .then(function(user){
    return res.status(200).send({ 
      message: "Location updated!",
      location: location
    })
  })
  .catch(function(err){
    return res.status(500).json({message: err});
  })
}

module.exports = {
  create: locationsCreate
}