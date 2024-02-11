import express from "express";
import healthModel from "../models/healthModel.js";

class healthController {
  addNewBlog = async (req, res) => {};

  static getAllData = async (req, res) => {
    try {
      //   addNewBlog(req, res);
      const randomDate = new Date(
        new Date() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
      );
      try {
        const addHealth = new healthModel({
          user: req.user._id, // Replace with a valid user ID from your User model
          timestamp: randomDate,
          biometric: {
            heartRate: Math.floor(Math.random() * (100 - 60 + 1)) + 60,
            bloodPressure: {
              systolic: Math.floor(Math.random() * (140 - 90 + 1)) + 90,
              diastolic: Math.floor(Math.random() * (90 - 60 + 1)) + 60,
            },
            oxygenSaturation: Math.floor(Math.random() * (100 - 95 + 1)) + 95,
          },
          activity: {
            stepCount: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
            distance: parseFloat((Math.random() * (10 - 1) + 1).toFixed(2)),
            caloriesBurned: Math.floor(Math.random() * (500 - 100 + 1)) + 100,
          },
          sleep: {
            duration: Math.floor(Math.random() * (14 - 0 + 1)) + 0,
            patterns: {
              deepSleep: Math.floor(Math.random() * (3 - 5 + 1)) + 5,
              remSleep: Math.floor(Math.random() * (3 - 5 + 1)) + 5,
            },
          },
          environment: {
            temperature: parseFloat(
              (Math.random() * (30 - 20) + 20).toFixed(1)
            ),
            altitude: Math.floor(Math.random() * (1000 - 0 + 1)),
          },
          location: {
            latitude: parseFloat((Math.random() * (90 - -90) + -90).toFixed(6)),
            longitude: parseFloat(
              (Math.random() * (180 - -180) + -180).toFixed(6)
            ),
          },
        });

        
        const savedBlog = await addHealth.save();
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
      const fetchAllData = await healthModel.find({ user: req.user._id });
      if (fetchAllData) {
        return res.status(200).json(fetchAllData);
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
}
export default healthController;

//65c0a4d537c1fd8bc37a5604
