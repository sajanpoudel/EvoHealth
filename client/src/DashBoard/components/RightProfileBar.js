import React from "react"
import '../home.css';
import ProfileImg from '../images/profile.jpeg';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const RightProfileBar =(props) => {
    return             <div id="right">
    <div id="profile" className="card">
        <h2>Profile</h2>
        <div id="profile-info">
        <Link to = "/profile"><img src={ProfileImg} alt="Profile photo"/></Link>
            <p id="profile-name">{props.username}</p>
            {/* <p id="profile-bio">A fitness enthusiast who loves to stay healthy and active.</p> */}
        </div>
        <div id="profile-stats">
            <p id="profile-weight">Weight: 75 kg</p>
            <p id="profile-height">Height: 180 cm</p>
            <p id="profile-bmi">BMI: 23.1</p>
        </div>
    </div>
    <div id="insurance" className="card">
        <h2>Insurance</h2>
        <div id="profile-stats">
            <p id="profile-weight">Company Name: Assurant Insurance</p>
            <p id="profile-height">Policy Number: BA5ASA12777</p>
            <p id="profile-bmi">Expiry Date: May 25, 2026</p>
            <p id="profile-bmi">Coverage: Upto $100,000</p>

        </div>

    </div>
    <div id="calendar" className="card">
        <h2>Calendar</h2>
        <div className="iframe-container">
        <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FNew_York&src=c2FqYW4xMjNwb3VkZWw0QGdtYWlsLmNvbQ&src=ZGFmNzFlZmY0YTY5MjFkYzIwNTViZTY5Zjk0YWVlZmI1YjVkMGE1ODIxZTA3YWNmZjcxMjE1MjMzOTZiN2Y5M0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%23AD1457"></iframe>
        </div>
    </div>
</div>

}
export default RightProfileBar;