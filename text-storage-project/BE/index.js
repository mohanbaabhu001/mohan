require("dotenv").config();  // Load environment variables from .env file

// Log Mongo URI to check if it's loaded properly
console.log("Mongo URI from .env:", process.env.MONGODB_URI);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Text = require("./models/Text"); // Model for storing texts
const Backup = require("./models/Backup"); // Model for backups

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);  // Exit if MongoDB connection fails
  });

// Route to store text in the database
app.post("/api/store", async (req, res) => {
  try {
    const { text } = req.body;
    const newText = new Text({ text });
    await newText.save();
    res.status(200).send("Text stored successfully!");
  } catch (err) {
    res.status(500).send("Error storing text.");
  }
});

// Route to fetch all stored texts from the database
app.get("/api/fetch", async (req, res) => {
  try {
    const texts = await Text.find();
    res.status(200).json(texts);
  } catch (err) {
    res.status(500).send("Error fetching texts.");
  }
});

// Route to delete a specific text from the database
app.delete("/api/delete/:id", async (req, res) => {
  try {
    await Text.findByIdAndDelete(req.params.id);
    res.status(200).send("Text deleted successfully!");
  } catch (err) {
    res.status(500).send("Error deleting text.");
  }
});

// Route to create a backup of all stored texts
app.get("/api/backup", async (req, res) => {
  try {
    const texts = await Text.find(); // Fetch all stored texts
    const backupTexts = texts.map(item => item.text); // Extract text content

    // Create a backup entry in the Backup collection
    const backup = new Backup({
      texts: backupTexts
    });

    await backup.save(); // Save backup to the database

    res.status(200).send({ message: "Backup successful!" });
  } catch (err) {
    console.error("Error backing up data:", err);
    res.status(500).send("Error backing up data");
  }
});

// Route to fetch all backups from the database
app.get("/api/backups", async (req, res) => {
  try {
    const backups = await Backup.find().sort({ createdAt: -1 }); // Get backups sorted by creation date
    res.status(200).json(backups);
  } catch (err) {
    res.status(500).send("Error fetching backups");
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
