var mongoose = require("mongoose");

var locationSchema = mongoose.Schema({
  external_id: { type: String, required: true },
  formatted_address: { type: String },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true }
})

module.exports = mongoose.model("Location", locationSchema);