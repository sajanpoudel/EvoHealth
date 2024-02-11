import mongoose from "mongoose";

// Define the schema
const wearableDataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Assuming there's a User model for the user information
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  biometric: {
    heartRate: { type: Number },
    bloodPressure: {
      systolic: { type: Number },
      diastolic: { type: Number },
    },
    oxygenSaturation: { type: Number },
    // Add other biometric data fields as needed
  },
  activity: {
    stepCount: { type: Number },
    distance: { type: Number },
    caloriesBurned: { type: Number },
    // Add other activity data fields as needed
  },
  sleep: {
    duration: { type: Number },
    patterns: {
      deepSleep: { type: Number },
      remSleep: { type: Number },
    },
    // Add other sleep data fields as needed
  },
  environment: {
    temperature: { type: Number },
    altitude: { type: Number },
    // Add other environmental data fields as needed
  },
  location: {
    latitude: { type: Number },
    longitude: { type: Number },
    // Add other location data fields as needed
  },
  // Add other data categories as needed
});

// Create the model
const healthModel = mongoose.model("WearableData", wearableDataSchema);

export default healthModel;
