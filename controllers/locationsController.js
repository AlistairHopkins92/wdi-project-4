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
  .findByIdAndUpdate(req.user._id, { 
    location: location._id,
    matches: []
  }, {
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

function locationsShow(req, res){
  User
  .find({ 
    "location": req.params.id,
    "_id": {
      "$ne": req.user._id // Don't include the current_user
    }
  })
  .then(function(users){
    return res.status(200).json({users: users});
  })
  .catch(function(err){
    console.log(err);
    return res.status(500).json({message: err});
  })
}
function match(req, res) {
  var matcherId = req.currentUser._id
  var matcheeId = req.user._id
  console.log("user id", user)
  console.log("currentUser id", currentUser)
  User.findByIdAndUpdate({ currentUser: matcheeId }, {
    $addToSet: { matches: matcherId }
  }, {
    new: true
  }).populate("user").exec(function(err, user){
    if (err) return res.status(500).json(err);
    res.status(201).json({ user: user });

  });
}

module.exports = {
  create: locationsCreate,
  show: locationsShow,
  match: match
}