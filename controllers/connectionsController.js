var User = require("../models/user");
var Connection = require("../models/connection");

function create(req, res) {
  Connection.findOne({sender: req.body.sender._id}, function(err, resend) {
    if (resend === null) {
      Connection.findOne({sender: req.body.receiver._id}, function(err, existingConnection) {
        if (existingConnection === null) {
          var connection = new Connection;
          connection.sender = req.body.sender;
          connection.receiver = req.body.receiver;
          connection.accepted = false;

          connection.save(function(err, conn) {
            console.log(conn.accepted);
            if (err) return res.status(500).send(err);
            if (!conn) return res.status(404).send(info);
            return res.status(200).send(conn);
          });
        } else {
          existingConnection.accepted = true;
          existingConnection.save(function(err, acceptedConnection) {
            console.log(acceptedConnection.accepted);
            if (err) return res.status(500).send(err);
            return res.status(200).send(acceptedConnection);
          });
        }
      }); 
    } else {
      return res.send({ message: "already sent these eyes!"});
    }
  });
}

function index(req, res) {
  var userId = req.body.user._id;
  Connection.find({ 
    $and: [ 
      { $or: [{sender: userId}, 
              {receiver: userId}] 
      },
      { accepted: true} 
    ]
  }, function(err, connections) {
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


