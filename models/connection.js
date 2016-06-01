var mongoose = require("mongoose");

var connectionSchema = new mongoose.Schema({
  sender:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  accepted: { type: Boolean }
})

module.exports = mongoose.model("Connection", connectionSchema);
