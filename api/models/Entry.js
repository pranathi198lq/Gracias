const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
        type: String,
        max:100,
    },
    desc: {
      type: String,
      max: 2000,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Entry", EntrySchema);