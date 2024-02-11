import express from "express";
import hospitalModel from "../models/hospitalModel.js";
// import

class hospitalController {
  static getAllHospitalData = async (req, res) => {
    try {
      const fetchAllData = await hospitalModel.find({ user: req.user._id });
      if (fetchAllData) {
        return res.status(200).json(fetchAllData);
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static addHospitalData = async (req, res) => {
    const {
      patientName,
      patientEmail,
      patientPhoneNumber,
      doctorName,
      doctorPhoneNumber,
      hospitalName,
      doctorComment
    } = req.body;
    try {
      if (
        (patientName,
        patientEmail,
        patientPhoneNumber,
        doctorName,
        doctorPhoneNumber,
        hospitalName,
        doctorComment)
      ) {
        const addData = new hospitalModel({
          patientName,
          patientEmail,
          patientPhoneNumber,
          doctorName,
          doctorPhoneNumber,
          hospitalName,
          doctorComment,
          thumbnail: req.file.filename,
          user: req.user._id
        });

        const savedData = await addData.save();
        if (savedData) {
          return res.status(200).json({ message: "Data Succeddfully added" });
        } else {
          return res.status(400).json({ message: "Data not saved" });
        }
      } else {
        return res.status(400).json({ message: "All Fields are required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static getSingleData = async (req, res) => {
    const { id } = req.params;
    try {
      if (id) {
        const fetchDataByUserID = await hospitalModel.findById(id);
        if (fetchDataByUserID) {
          return res.status(200).json(fetchDataByUserID);
        } else {
          return res.status(400).json({ message: "Data not found" });
        }
      } else {
        return res.status(400).json({ message: "Invalid URL" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
}
export default hospitalController;
