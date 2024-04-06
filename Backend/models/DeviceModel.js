const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema(
  {
  serialNumber: { 
    type: String, 
    required: true, 
    unique: true 
  },
  type: { 
    type: String, 
    enum: ['POS', 'KIOSK', 'Signage'], 
    required: true 
  },
  image: {
    type:String, 
    required: true
  },
  status: { 
    type: String, 
    enum: ['Active', 'Inactive'],  
  }
});

const DeviceModel = mongoose.model('devices', deviceSchema);
module.exports = DeviceModel;
