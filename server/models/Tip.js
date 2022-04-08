const { Schema } = require("mongoose");

const TipSchema = new Schema({
  tip: {
    type: Number,
    required: true,
  },
});

module.exports = TipSchema;
