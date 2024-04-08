const express = require('express');
const multer = require('multer');
const DeviceModel = require('../models/DeviceModel');
const LocationModel = require('../models/LocationModel');
const deviceRouter = express.Router();
deviceRouter.use(express.json());
const sharp = require('sharp');
const multerStorage = multer.memoryStorage(); // Rename multer storage variable
const upload = multer({ storage: multerStorage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed'));
    }
    cb(null, true);
  } }); 

const { Storage } = require('@google-cloud/storage');
const gcsStorage = new Storage({ keyFilename: 'C:/HND/endless-tractor-419520-4014ae5d806a.json' }); // Rename Google Cloud Storage variable
const bucket = gcsStorage.bucket('device_hub'); // Use renamed Google Cloud Storage variable

deviceRouter.get('/', async (req, res) => {
  try {
    const devices = await DeviceModel.find();
    const devicesWithImages = await Promise.all(devices.map(async (device) => {
      const imageUrl = await getImageUrl(device.image);
      return { ...device.toObject(), imageUrl };
    }));
    res.json(devicesWithImages);
  } catch (error) {
    res.status(500).send({ status: 0, message: error.message });
  }
});

deviceRouter.post('/add', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('Please upload an image');
    }

    const processedImage = await sharp(req.file.buffer).toFormat('jpeg').toBuffer();
    const fileName = `${Date.now()}-${req.file.originalname}`;
    const file = bucket.file(fileName);
    await file.save(processedImage);
    const imageUrl = `https://storage.googleapis.com/device_hub/${fileName}`;

    const { serialNumber, type, status, name } = req.body;

    if (!serialNumber) {
      return res.status(400).send({ status: 0, message: 'Serial number is required' });
    }
    // Check if serial number already exists
    const existingDevice = await DeviceModel.findOne({ serialNumber });
    if (existingDevice) {
      return res.status(400).send({ status: 0, message: 'Serial number already exists' });
    }
    // Validate serial number format (no special characters)
    const serialNumberRegex = /^[a-zA-Z0-9\-_]+$/;
    if (!serialNumberRegex.test(serialNumber)) {
      return res.status(400).send({ status: 0, message: 'Serial number cannot contain special characters' });
    }

    const newDevice = new DeviceModel({
      serialNumber,
      type,
      status,
      image: imageUrl
    });

    const savedDevice = await newDevice.save();
    const locations = await LocationModel.findOne({ name });

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

async function getImageUrl(imagePath) {
  try {
    const [metadata] = await bucket.file(imagePath).getMetadata();
    console.log("Image -",metadata);
    return metadata.mediaLink;
  } catch (error) {
    console.error('Error fetching image URL:', error);
    return null;
  }
}

deviceRouter.patch('/update', async (req, res) => {
  try {
    const { serialNumber, status } = req.body;

    if (!serialNumber) {
      return res.status(400).send({ status: 0, message: 'Serial number is required' });
    }

    // Find the device by serial number
    const existingDevice = await DeviceModel.findOne({ serialNumber });
    if (!existingDevice) {
      return res.status(404).send({ status: 0, message: 'Device not found' });
    }

    // Update the device status
    existingDevice.status = status;
    await existingDevice.save();

    res.send({ status: 1, message: 'Device status updated successfully', data: existingDevice });
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
