const mongoose = require('mongoose');
const config = require('../config.js');
mongoose.connect(config.db.uri);

module.exports = mongoose.connection;
