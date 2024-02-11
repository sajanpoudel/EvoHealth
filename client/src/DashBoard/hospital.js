import React, { useState, useEffect } from "react";
import "./home.css"; // Assuming that the CSS is in home.css in the same folder

import NavBar from "./components/navbar";
import RightProfileBar from "./components/RightProfileBar";
import axios from "axios";

function Hospital() {
  const [data, setData] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve token from localStorage
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
        }

        // Make GET request to backend API
        const response = await axios.get(
          "https://evohealth.onrender.com/api/v1/get/alldata",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`, // Use stored token directly
            },
          }
        );

        // Set data state with the response data
        setData(response.data);
        console.log(response.data[0].patientName);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  return (
    <div className="Hospital-Dashboard">
      <NavBar />
      <div id="main">
        <div id="greeting" className="card">
          <h2>Your All Health Reports</h2>
          <p id="greeting-message">
            This is the collection of all your health reports from different
            hospitals.
          </p>
        </div>
        <div id="cards" className="card">
          <h2>Reports History</h2>
          {data ? (
            <div>
              {data.map((report, index) => (
            <div className="hospital-card-list">
                <div key={index}>
                  <span id="date" name="date">
                    {report.date}
                  </span>
                  <span id="hospital-name" name="hospital-name">
                    {report.hospitalName}
                  </span>
                  <span id="doctor-name" name="doctor-name">
                    {report.doctorName}
                  </span>
                  <span id="report-view" name="report-view">
                    View Report
                  </span>
                  <span id="call-now" name="call-now">
                    <a
                      className="fixed-tel"
                      href={`tel:${report.contactNumber}`}
                      target="_blank"
                      title="Call Now"
                    ></a>
                  </span>
                </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <RightProfileBar />
    </div>
  );
}

export default Hospital;
