const { Schema } = require("mongoose");

const PercentageSchema = new Schema({
  percentage: {
    type: Number,
    required: true,
  },
});

module.exports = PercentageSchema;
