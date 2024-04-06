const express = require('express');
const multer = require('multer');
const DeviceModel = require('../models/DeviceModel');
const LocationModel = require('../models/LocationModel');
const deviceRouter = express.Router();
deviceRouter.use(express.json());
const sharp = require('sharp');
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

deviceRouter.use('/uploads', express.static(path.join(__dirname, '../uploads')));

deviceRouter.get('/', async (req, res) => {
  try {
    const devices = await DeviceModel.find();
    res.json(devices);
  } catch (error) {
    res.status(500).send({ status: 0, message: error.message });
  }
});

deviceRouter.post('/add', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('Please upload an image');
    }
    
    const { serialNumber, type, status, name } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;
    const newDevice = new DeviceModel({
      serialNumber,
      type,
      status,
      image: imageUrl
    });

    const savedDevice = await newDevice.save();
    const locations = await LocationModel.findOne({ name: name});

    if (!locations) {
      return res.status(404).send({ status: 0, message: 'Location not found' });
    }

    locations.devices.push(savedDevice._id);
    await locations.save();

    res.send({ status: 1, message: 'Device added and associated with location', data: { ...savedDevice.toObject(), imageUrl } });
  } catch (error) {
    res.status(400).send({ status: 0, message: error.message });
  }
});


deviceRouter.delete('/:serialNumber', async (req, res) => {
  const { serialNumber } = req.params;
  try {
    const device = await DeviceModel.findOneAndDelete({ serialNumber });
    if (!device) {
      return res.status(404).send({ status: 0, message: 'Device not found' });
    }
    const location = await LocationModel.findOne({ devices: device._id });
    if (location) {
      location.devices.pull(device._id);
      await location.save();
    }
    res.send({ status: 1, message: 'Device deleted', data: device });
  } catch (error) {
    res.status(500).send({ status: 0, message: error.message });
  }
});

module.exports = deviceRouter;
