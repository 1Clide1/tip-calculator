const { Schema } = require("mongoose");

const TipSchema = new Schema({
  tipId: {
    type: String,
    required: true,
  },
  tip: {
    type: Number,
    required: true,
  },
});

module.exports = TipSchema;
