const moongoose = require('mongoose');
require('dotenv').config();

const connection = moongoose.connect(process.env.DB_LINK);
module.exports = connection;