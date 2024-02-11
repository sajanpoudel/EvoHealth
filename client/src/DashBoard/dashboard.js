import React from "react";
import "./home.css"; // Assuming that the CSS is in home.css in the same folder
import Step from "./images/step.png";
import CaloriesBurn from "./images/caloriesburn.png";
import Pressure from "./images/pressure.png";
import NavBar from "./components/navbar";
import RightProfileBar from "./components/RightProfileBar";
import {useEffect, useState} from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import {TypingIndicator} from '@chatscope/chat-ui-kit-react';


function Dashboard() {
    const [data, setData] = useState(null);
    const [token, setToken] = useState("");
    const [stepCountLastEntry, setstepCountLastEntry] = useState(0);
    const [calories, setCalories] = useState(0);
    const [bloodPressure, setBloodPressure] = useState([]);
    const username = localStorage.getItem("username");
    const [caloriesData, setCaloriesData] = useState([]);
    const [heartRateData, setHeartRateData] = useState([]);
    const [sleepDurationData, setSleepDurationData] = useState([]);
    const [bloodPressureData, setBloodPressureData] = useState([]);
    const [response, setResponse] = useState("")
    const API_KEY = "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";
    const response_format = `Your health is below average today. Your blood pressure is high, and their heartbeat is slightly elevated. Nutrition levels are low, indicating potential dietary deficiencies. Your sleep cycle is below average, possibly affecting overall well-being. The calories burned are also lower than usual, suggesting a need for increased physical activity or dietary adjustments to improve health.
  
  In contrast, You enjoy above-average health today. Your blood pressure is normal, accompanied by a strong and steady heartbeat. Nutrition levels are high, reflecting a balanced and nourishing diet. Your sleep cycle is excellent, contributing to overall well-being. The calories burned are above average, indicating good metabolic activity and potential improvements in fitness.
  
  Today, Your health remains at an average level. Your blood pressure is slightly lower than usual, with a steady heartbeat. Nutrition levels and sleep cycle are both average, suggesting a need for consistent habits to maintain overall health. The calories burned are consistent with routine levels, indicating stable metabolic activity.
  
  Today marks your excellent state of health. Your blood pressure is optimal, and their heartbeat is strong and steady. Nutrition levels are very high, reflecting a well-rounded and nourishing diet. You enjoy a good sleep cycle, contributing to overall well-being. The calories burned are above average, indicating increased metabolic activity and potential improvements in fitness.
  Your health parameters today mirror those of the first person, with below-average indicators. High blood pressure and an elevated heartbeat suggest potential cardiovascular strain. Nutrition levels are low, indicating ongoing dietary concerns, while the sleep cycle remains below average. The calories burned are also lower than usual, highlighting a need for lifestyle modifications to improve overall health and well-being.`;

    // Inline CSS keyframes animation
    const glowAnimation = `
    @keyframes glow {
      0% {
        border-color: rgba(0, 191, 255, 0.8); /* Base color */
      }
      50% {
        border-color: rgba(0, 191, 255, 1); /* Bright glowing color */
      }
      100% {
        border-color: rgba(0, 191, 255, 0.8); /* Back to base color */
      }
    }
  `;
    const [isTyping, setIsTyping] = useState(false);

    const [healthAnalysis, setHealthAnalysis] = useState('');

    useEffect(() => { // Fetch health analysis from OpenAI API
        setIsTyping(true);

        fetchHealthAnalysis();
    }, []);
    useEffect(() => {
        if (healthAnalysis) {
            setIsTyping(false);
        }
    }, [healthAnalysis]);
    const apiRequestBody = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                role: "system",
                content: `I am a health assistant. Your job is to motivate people rather than discouring people so only provide inspirational message. DO not include to harse comment. DO not include number. Present in a way people can easily understand. This are five different same output format you should be using. DO not include numbers ${response_format}. The is the data you should be using this data that is extracted from the user's smart watch.${response} .`
            },
        ]
    };
    const fetchHealthAnalysis = async () => {
        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiRequestBody)
            });

            const data = await response.json();
            console.log(data)
            // Update the state with the first choice's text
            if (data.choices && data.choices.length > 0) {
                setHealthAnalysis(data.choices[0].message.content);
            }

        } catch (error) {
            console.error('Error fetching health analysis:', error.message);
            setHealthAnalysis('Error fetching health analysis');
            setIsTyping(false);

        }
    };

    useEffect(() => { // Retrieve token from localStorage
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }

        const fetchData = async () => {
            try { // Make GET request to backend API
                const response = await axios.get("https://evohealth.onrender.com/api/v1/get/getdata", {
                    headers: {
                        Authorization: `Bearer ${storedToken}`, // Use stored token directly
                    }
                });

                // Set data state with the response data
                if (response1.length > 4) { // Update the response to include only the last 4 objects
                    setResponse(response1.slice(-4));
                } else {
                    setResponse(response1)
                }
                setData(response1.data);
                // console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData(); // Call the fetchData function when the component mounts
    }, []);

    useEffect(() => {
        if (data) {
            const jsonArrayParsed = JSON.parse(JSON.stringify(data));

            console.log(jsonArrayParsed);

            // Access the last entry in the array
            const lastEntry = jsonArrayParsed[jsonArrayParsed.length - 1];

            // Extract the stepCount property from the last entry
            setstepCountLastEntry(lastEntry.activity.stepCount);
            setCalories(lastEntry.activity.caloriesBurned);
            setBloodPressure([lastEntry.biometric.bloodPressure.systolic, lastEntry.biometric.bloodPressure.diastolic,]);

            // console.log(stepCountLastEntry); // Output: 9194
        }
    }, [data]);

    useEffect(() => {
        if (data) {
            const calories = data.map((entry) => entry.activity.caloriesBurned);
            setCaloriesData(calories);
        }
    }, [data]);

    useEffect(() => {
        if (data) {
            const heartRateData = data.map((entry) => entry.biometric.heartRate);
            const sleepDurationData = data.map((entry) => entry.sleep.duration);
            const bloodPressureData = data.map((entry) => `${
                entry.biometric.bloodPressure.systolic
            }/${
                entry.biometric.bloodPressure.diastolic
            }`);

            // Set state for heart rate, sleep duration, and blood pressure data
            setHeartRateData(heartRateData);
            setSleepDurationData(sleepDurationData);
            setBloodPressureData(bloodPressureData);
        }
    }, [data]);

    useEffect(() => {
        if (caloriesData.length > 0) {
            const ctx = document.getElementById("caloriesChart");

            new Chart(ctx, {
                type: "line",
                data: {
                    labels: caloriesData.map(
                        (_, index) => `Entry ${
                            index + 1
                        }`
                    ),
                    datasets: [
                        {
                            label: "Calories Burned",
                            data: caloriesData,
                            borderColor: "rgba(0, 191, 255, 0.8)", // Sky blue color
                            backgroundColor: "rgba(0, 191, 255, 0.2)", // Light sky blue background
                            tension: 0.4,
                            borderWidth: 2,
                            pointBackgroundColor: "rgba(0, 191, 255, 0.8)", // Sky blue color for data points
                            pointBorderColor: "rgba(0, 191, 255, 0.8)", // Sky blue color for data points
                            pointBorderWidth: 2,
                            pointRadius: 5,
                            pointHoverRadius: 8
                        },
                    ]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: "Calories Burned Over Time",
                            color: "rgba(0, 191, 255, 0.8)", // Sky blue color for title
                            font: {
                                size: 18
                            }
                        },
                        legend: {
                            display: true,
                            labels: {
                                color: "rgba(0, 191, 255, 0.8)", // Sky blue color for legend
                                font: {
                                    size: 14
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                color: "rgba(0, 191, 255, 0.2)", // Light sky blue color for grid lines
                            },
                            ticks: {
                                color: "rgba(0, 191, 255, 0.8)", // Sky blue color for axis labels
                                font: {
                                    size: 12
                                }
                            }
                        },
                        y: {
                            grid: {
                                color: "rgba(0, 191, 255, 0.2)", // Light sky blue color for grid lines
                            },
                            ticks: {
                                color: "rgba(0, 191, 255, 0.8)", // Sky blue color for axis labels
                                font: {
                                    size: 12
                                }
                            }
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    }, [caloriesData]);

    useEffect(() => {
        if (heartRateData.length > 0) {
            const ctx = document.getElementById("heartRateChart");

            new Chart(ctx, {
                type: "line",
                data: {
                    labels: heartRateData.map(
                        (_, index) => `Entry ${
                            index + 1
                        }`
                    ),
                    datasets: [
                        {
                            label: "Calories Burned",
                            data: heartRateData,
                            borderColor: "rgba(0, 191, 255, 0.8)", // Sky blue color
                            backgroundColor: "rgba(0, 191, 255, 0.2)", // Light sky blue background
                            tension: 0.4,
                            borderWidth: 2,
                            pointBackgroundColor: "rgba(0, 191, 255, 0.8)", // Sky blue color for data points
                            pointBorderColor: "rgba(0, 191, 255, 0.8)", // Sky blue color for data points
                            pointBorderWidth: 2,
                            pointRadius: 5,
                            pointHoverRadius: 8
                        },
                    ]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: "Calories Burned Over Time",
                            color: "rgba(0, 191, 255, 0.8)", // Sky blue color for title
                            font: {
                                size: 18
                            }
                        },
                        legend: {
                            display: true,
                            labels: {
                                color: "rgba(0, 191, 255, 0.8)", // Sky blue color for legend
                                font: {
                                    size: 14
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                color: "rgba(0, 191, 255, 0.2)", // Light sky blue color for grid lines
                            },
                            ticks: {
                                color: "rgba(0, 191, 255, 0.8)", // Sky blue color for axis labels
                                font: {
                                    size: 12
                                }
                            }
                        },
                        y: {
                            grid: {
                                color: "rgba(0, 191, 255, 0.2)", // Light sky blue color for grid lines
                            },
                            ticks: {
                                color: "rgba(0, 191, 255, 0.8)", // Sky blue color for axis labels
                                font: {
                                    size: 12
                                }
                            }
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    }, [heartRateData]);

    useEffect(() => {
        if (sleepDurationData.length > 0) {
            const ctx = document.getElementById("sleepDurationChart");

            new Chart(ctx, {
                type: "line",
                data: {
                    labels: sleepDurationData.map(
                        (_, index) => `Entry ${
                            index + 1
                        }`
                    ),
                    datasets: [
                        {
                            label: "Calories Burned",
                            data: sleepDurationData,
                            borderColor: "rgba(0, 191, 255, 0.8)", // Sky blue color
                            backgroundColor: "rgba(0, 191, 255, 0.2)", // Light sky blue background
                            tension: 0.4,
                            borderWidth: 2,
                            pointBackgroundColor: "rgba(0, 191, 255, 0.8)", // Sky blue color for data points
                            pointBorderColor: "rgba(0, 191, 255, 0.8)", // Sky blue color for data points
                            pointBorderWidth: 2,
                            pointRadius: 5,
                            pointHoverRadius: 8
                        },
                    ]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: "Calories Burned Over Time",
                            color: "rgba(0, 191, 255, 0.8)", // Sky blue color for title
                            font: {
                                size: 18
                            }
                        },
                        legend: {
                            display: true,
                            labels: {
                                color: "rgba(0, 191, 255, 0.8)", // Sky blue color for legend
                                font: {
                                    size: 14
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                color: "rgba(0, 191, 255, 0.2)", // Light sky blue color for grid lines
                            },
                            ticks: {
                                color: "rgba(0, 191, 255, 0.8)", // Sky blue color for axis labels
                                font: {
                                    size: 12
                                }
                            }
                        },
                        y: {
                            grid: {
                                color: "rgba(0, 191, 255, 0.2)", // Light sky blue color for grid lines
                            },
                            ticks: {
                                color: "rgba(0, 191, 255, 0.8)", // Sky blue color for axis labels
                                font: {
                                    size: 12
                                }
                            }
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    }, [sleepDurationData]);

    // console.log(data)

    return (
        <div className="Health-Dashboard">
            <NavBar/>

            <div id="main">
                <div id="greeting" className="card">
                    <h2>Your Health Analysis</h2>
                    <p id="greeting-message">
                        {
                        isTyping ? <TypingIndicator content="Please wait! MediGuide AI is analyzing your health data "/> : healthAnalysis
                    } </p>
                </div>
                <div id="cards" className="card">
                    <h2>Cards</h2>
                    <div className="small-card">
                        <img src={Step}
                            alt="Steps icon"/>
                        <span id="steps">
                            {stepCountLastEntry}</span>
                        <span>steps</span>
                    </div>
                    <div className="small-card">
                        <img src={CaloriesBurn}
                            alt="Calories icon"/>
                        <span id="calories">
                            {calories}</span>
                        <span>calories</span>
                    </div>
                    <div className="small-card">
                        <img src={Pressure}
                            alt="bp icon"/>
                        <span id="bp">
                            {
                            (bloodPressure[0] + bloodPressure[1]) / 2
                        }</span>
                        <span>Blood Pressure</span>
                    </div>
                    {/* Repeat for other cards */}
                    {" "} </div>
                <div id="graph" className="graph"
                    style={
                        {
                            display: "flex",
                            flexDirection: "column"
                        }
                }>
                    <h2>Graph</h2>
                    <div className="graph-internal"
                        style={
                            {
                                display: "flex",
                                flexDirection: "column"
                            }
                    }>
                        <div className="graph-small-card">
                            {/* <img src={Graph} className="graph-img" alt="calories" /> */}
                            {/* <canvas id="caloriesChart"></canvas> */}
                            <canvas id="caloriesChart" className="chart-container"
                                style={
                                    {height: "400px"}
                            }></canvas>
                        </div>
                        <div className="graph-small-card">
                            {/* <img src={Graph} className="graph-img" alt="calories" /> */}
                            <canvas id="heartRateChart" className="chart-container"
                                style={
                                    {height: "400px"}
                            }></canvas>
                        </div>
                        <div className="graph-small-card">
                            {/* <img src={Graph} className="graph-img" alt="calories" /> */}
                            <canvas id="sleepDurationChart" className="chart-container"
                                style={
                                    {height: "400px"}
                            }></canvas>
                        </div>
                        <div className="graph-small-card">
                            {/* <img src={Graph} className="graph-img" alt="calories" /> */} </div>
                    </div>
                </div>
                <div id="sleep" className="card">
                    <h2>Sleep</h2>
                    <div id="sleep-bar">
                        <div id="sleep-progress"></div>
                    </div>
                    <span id="sleep-percentage">0%</span>
                    <span>of 8 hours</span>
                </div>
                {/* Repeat for other sections */}
                {" "} </div>
            <RightProfileBar username={username}/>
        </div>
    );
}

export default Dashboard;
