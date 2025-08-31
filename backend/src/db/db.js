const mongoose = require("mongoose");

async function connectDB() {
  try {
    console.log("MongoDB URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ DB connected successfully");
  } catch (error) {
    console.error("❌ Error in DB connect:", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
