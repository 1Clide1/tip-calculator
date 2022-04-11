const { Schema } = require("mongoose");

const PercentageSchema = new Schema({
  percentage: {
    type: String,
    required: true,
  },
});

module.exports = PercentageSchema;
