import "../home.css"; // Assuming that the CSS is in home.css in the same folder
import React, { useState } from "react";
import "../home.css";
import "../Upload/form.css"
import NavBar from "../components/navbar";
import RightProfileBar from "../components/RightProfileBar";
import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    bloodGroup: "",
    address: "",
    weight: "",
    height: "",
    insuranceCompany: "",
    policyNumber: "",
    expiryDate: "",

    profile: "",
 
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
      formDataWithFile.append("fullName", formData.fullName);
      formDataWithFile.append("phoneNumber", formData.phoneNumber);
      formDataWithFile.append("bloodGroup", formData.bloodGroup);
      formDataWithFile.append("address", formData.address);
      formDataWithFile.append("height", formData.height);
      formDataWithFile.append("insuranceNumber", formData.insuranceNumber);

      formDataWithFile.append("policyNumber", formData.policyNumber);
      formDataWithFile.append("expiryDate", formData.expiryDate);


      formDataWithFile.append("profile", file);

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
    <div className="Profile-Dashboard">
      <NavBar />

      <div id="main">
        <div id="greeting" className="card">
          <h2>Profile Page</h2>
          <p id="greeting-message">
            Provide your accurate profile information
          </p>
        </div>
        <div className="form-field">
          <form onSubmit={handleSubmit} className="form">
          <label>
              Profile Photo
              <input
                type="file"
                accept=".jpg"
                onChange={handleFileChange}
                className="input"
              />
            </label>
            <label>
              Full Name
              <input
                type="text"
                name="fullName"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={handleChange}
                className="input"
              />
            </label>

            <label>
              Phone Number
              <input
                type="tel"
                name="phoneNumber"
                placeholder="User Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="input"
              />
            </label>
            <label>
              Blood Group
              <input
                type="text"
                name="bloodGroup"
                placeholder="Your Blood Group"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="input"
              />
            </label>
            <label>
              Mailing Address
              <input
                type="text"
                name="address"
                placeholder="Your livig address"
                value={formData.address}
                onChange={handleChange}
                className="input"
              />
            </label>
     

            <label>
              Height
              <input
                type="text"
                name="height"
                placeholder="Your height in inches"
                value={formData.height}
                onChange={handleChange}
                className="input"
              />
            </label>

            <label>
              Weight
              <input
                type="text"
                name="weight"
                placeholder="Your weight in pound"
                value={formData.weight}
                onChange={handleChange}
                className="input"
              />
            </label>

            <label>
              Insurance Company
              <input
                type="text"
                name="insuranceCompany"
                placeholder="Provide the name of the the insurance company you are affilated with"
                value={formData.insuranceCompany}
                onChange={handleChange}
                className="input"
              />
            </label>
            <label>
              policyNumber
              <input
                type="text"
                name="policyNumber"
                placeholder="Provide your insurance policy number"
                value={formData.policyNumber}
                onChange={handleChange}
                className="input"
              />
            </label>
            <label>
              ExpiryDate
              <input
                type="text"
                name="expiryDate"
                placeholder="Provide your insurance expiry date"
                value={formData.expiryDate}
                onChange={handleChange}
                className="input"
              />
            </label>
     
            <button
              type="submit"
              onClick={handleSubmit}
              className="submit-button"
            >
              Update User Profile
            </button>
          </form>
        </div>
      </div>

      <RightProfileBar />
    </div>
  );
};

export default Profile;
