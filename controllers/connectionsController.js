var User = require("../models/user");
var Connection = require("../models/connection");

/*
 * EYES
 */
function create(req, res) {
  // If you have already sent them a request
  Connection.findOne({
    sender: req.body.sender,
    receiver: req.body.receiver,
  }, function(err, resend) {
    if (resend !== null && resend.accepted) return res.send({ message: "Already matched!"});
    if (resend !== null && !resend.accepted) return res.send({ message: "Already sent these eyes!"});
    
    // If they have already sent you a request
    Connection.findOne({
      sender: req.body.receiver,
      receiver: req.body.sender,
      accepted: false
    }, function(err, existingConnection) {
      if (existingConnection === null) {
        var connection = new Connection();
        connection.sender   = req.body.sender;
        connection.receiver = req.body.receiver;
        connection.accepted = false;

        connection.save(function(err, conn) {
          if (err) return res.status(500).send(err);
          if (!conn) return res.status(404).send(info);
          return res.status(200).send({ message: "Unmatched connection created", connection: conn });
        });
      } else {
        existingConnection.accepted = true;
        existingConnection.save(function(err, acceptedConnection) {
          if (err) return res.status(500).send(err);
          return res.status(200).send({ message: "Connection matched!", connection: acceptedConnection });
        });
      }
    }); 
  });
}

function index(req, res) {
  var userId = req.params.id;
  console.log(userId);

  Connection.find({ 
    $or: [
      {sender:   userId, accepted: true }, 
      {receiver: userId, accepted: true }, 
    ]
  }).populate(["sender", "receiver"]).exec(function(err, connections) {
    if (err) return res.status(500).send(err);
    console.log(connections);
    return res.status(200).send(connections);
  })
}

module.exports = {
  create: create,
  index: index
}

// Connection.find({ $or: [{sender: receiver._id}, {receiver: sender._id}])


