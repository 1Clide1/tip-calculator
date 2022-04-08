const { Schema } = require("mongoose");

const PercentageSchema = new Schema({
  percentageId: {
    type: String,
    require: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
});

module.exports = PercentageSchema;
