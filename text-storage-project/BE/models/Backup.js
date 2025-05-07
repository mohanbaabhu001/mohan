const mongoose = require("mongoose");

const backupSchema = new mongoose.Schema({
  texts: [String], // Array of texts to store
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Backup = mongoose.model("Backup", backupSchema);

module.exports = Backup;