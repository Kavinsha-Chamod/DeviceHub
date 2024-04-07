const express = require("express");
const LocationModel = require("../models/LocationModel");
const locationRouter = express.Router();
locationRouter.use(express.json());

locationRouter.get("/", async (req, res) => {
  try {
    const locations = await LocationModel.find().populate("devices");
    res.status(200).send({ status: 1, message: "Locations fetched", data: locations });
  } catch (error) {
    res.status(500).send({ status: 0, message: error.message });
  }
});

locationRouter.post("/add", async (req, res) => {
  try {
    const { name, address, phone, deviceIds } = req.body;

    const existingLocation = await LocationModel.findOne({ name });
    if (existingLocation) {
      return res.status(400).send({ status: 0, message: "Location with this name already exists." });
    }
    
    const existingDevices = await LocationModel.findOne({ devices: { $in: deviceIds } });
    if (existingDevices) {
      return res.status(400).send({ status: 0, message: "One or more devices are already associated with another location." });
    }
    
    const location = new LocationModel({
      name,
      address,
      phone,
      devices: deviceIds
    });
    const response = await location.save();
    res.status(201).send({ status: 1, message: "Location added", data: response });
  } catch (error) {
    res.status(400).send({ status: 0, message: error.message });
  }
});

locationRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await LocationModel.findByIdAndUpdate(id, req.body, { new: true });
    if (response) {
      res.status(200).send({ status: 1, message: "Location updated", data: response });
    } else {
      res.status(404).send({ status: 0, message: "Location not found" });
    }
  } catch (error) {
    res.status(500).send({ status: 0, message: error.message });
  }
});

locationRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await LocationModel.findByIdAndDelete(id);
    if (response) {
      res.status(200).send({ status: 1, message: "Location deleted" });
    } else {
      res.status(404).send({ status: 0, message: "Location not found" });
    }
  } catch (error) {
    res.status(500).send({ status: 0, message: error.message });
  }
});

module.exports = locationRouter;
