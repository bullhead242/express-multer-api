'use strict';

const multer = require('multer');
const storage = multer.memoryStorage(); // don't do w real apps PLZ

module.exports = multer({ storage });
