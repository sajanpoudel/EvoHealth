import "../home.css"; // Assuming that the CSS is in home.css in the same folder
import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import "./form.css";
import NavBar from "../components/navbar";
import RightProfileBar from "../components/RightProfileBar";
import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Upload = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    patientEmail: "",
    patientPhoneNumber: "",
    doctorName: "",
    doctorPhoneNumber: "",
    hospitalName: "",
    thumbnail: "",
    doctorComment: "",
  });
  const [numPages, setNumPages] = useState(null);

  const [token, setToken] = useState("");

  const [file, setFile] = useState(null)

  const history = useHistory();
 
  useEffect(() => {
    // Retrieve token from localStorage
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithFile = new FormData();
      formDataWithFile.append("patientName", formData.patientName);
      formDataWithFile.append("patientEmail", formData.patientEmail);
      formDataWithFile.append("patientPhoneNumber", formData.patientPhoneNumber);
      formDataWithFile.append("doctorName", formData.doctorName);
      formDataWithFile.append("doctorPhoneNumber", formData.doctorPhoneNumber);
      formDataWithFile.append("hospitalName", formData.hospitalName);
      formDataWithFile.append("doctorComment", formData.doctorComment);
      formDataWithFile.append("thumbnail", file);

      const res = await axios.post(
        "https://evohealth.onrender.com/api/v1/add/adddata",
        formDataWithFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);
      history.push("/dashboard");
    } catch (error) {
      alert(error);
    }

    console.log(formData);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  return (
    <div className="Health-Dashboard">
      <NavBar />

      <div id="main">
        <div id="greeting" className="card">
          <h2>Upload your Health thumbnails Provided By Hospitals</h2>
          <p id="greeting-message">
            Provide all the accurate data provided by Hospitals. We recommend
            doctors to upload their patients data through the portal.
          </p>
        </div>
        <div className="form-field">
          <form onSubmit={handleSubmit} className="form">
            <label>
              Patient Name
              <input
                type="text"
                name="patientName"
                placeholder="Name of the patient"
                value={formData.patientName}
                onChange={handleChange}
                className="input"
              />
            </label>
            <label>
              Patient Email
              <input
                type="email"
                name="patientEmail"
                placeholder="Email Address of the patient"
                value={formData.patientEmail}
                onChange={handleChange}
                className="input"
              />
            </label>
            <label>
              Patient Phone Number
              <input
                type="tel"
                name="patientPhoneNumber"
                placeholder="Patient Phone Number"
                value={formData.patientPhoneNumber}
                onChange={handleChange}
                className="input"
              />
            </label>
            <label>
              Doctor Name
              <input
                type="text"
                name="doctorName"
                placeholder="Name of the doctor who evaluated your health thumbnail "
                value={formData.doctorName}
                onChange={handleChange}
                className="input"
              />
            </label>
            <label>
              Doctor Phone Number
              <input
                type="tel"
                name="doctorPhoneNumber"
                placeholder="Doctor Contact Number "
                value={formData.doctorPhoneNumber}
                onChange={handleChange}
                className="input"
              />
            </label>
            <label>
              Hospital Name
              <input
                type="text"
                name="hospitalName"
                placeholder="Name of the Hospital who performed treatment"
                value={formData.hospitalName}
                onChange={handleChange}
                className="input"
              />
            </label>
            <label>
              Patient thumbnail (PDF)
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="input"
              />
            </label>
            <label>
              Doctor Comment
              <textarea
                name="doctorComment"
                placeholder="Detailed doctor comment to help patient learn their conditions"
                value={formData.doctorComment}
                onChange={handleChange}
                className="input"
              />
            </label>
            <button
              type="submit"
              onClick={handleSubmit}
              className="submit-button"
            >
              Add Patient thumbnail
            </button>
          </form>
        </div>
      </div>

      <RightProfileBar />
    </div>
  );
};

export default Upload;
