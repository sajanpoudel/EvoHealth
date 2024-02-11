import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
  patientName: {
    type: String,
  },
  patientEmail: {
    type: String,
  },
  patientPhoneNumber: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    refer: "users",
  },
  doctorName:{
    type: String
  },
  doctorPhoneNumber:{
    type: String
  
  },
  hospitalName:{
    type: String
  },
  doctorComment:{
    type: String
  }
});

const hospitalModel = mongoose.model("blogs", hospitalSchema);
export default hospitalModel;