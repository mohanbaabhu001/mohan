const mongoose = require("mongoose");

const textSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },  // Store each text as a string
  },
  { timestamps: true }  // Automatically track the creation time
);

const Text = mongoose.model("Text", textSchema);

module.exports = Text;
