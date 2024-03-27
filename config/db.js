const mongoose = require("mongoose");
require("dotenv").config();
const Connection = mongoose.connect(process.env.URL);

module.exports = {
    Connection
};
