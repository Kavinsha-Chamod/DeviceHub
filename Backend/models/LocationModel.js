const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
  {
  name: { 
    type: String,
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  devices: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'devices',
    required: true,
  }]
});

LocationModel = mongoose.model('locations', locationSchema);
module.exports = LocationModel;
