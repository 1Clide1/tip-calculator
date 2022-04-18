const { Schema } = require("mongoose");

const TipSchema = new Schema({
  tip: {
    type: String,
    required: true,
  },
});

module.exports = TipSchema;
