const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {connection} = require('./db');
const PORT = process.env.PORT;
const app = express();
const deviceRouter = require('./routes/deviceRoutes');
const locationRouter = require('./routes/locationRoutes');

app.use(cors());
app.use(express.json());
app.use("/devices", deviceRouter);
app.use("/locations", locationRouter);

app.get('/', (req, res) => {
    res.send({message:'API is running'});
});

app.listen(process.env.PORT,async () => {
  try {
    await connection
    console.log("Database connected")
  } catch (error) {
    console.log(error) 
  }
    console.log(`Server is running on port ${PORT}`);
});
module.exports = app;