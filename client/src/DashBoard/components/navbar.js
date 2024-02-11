import React from "react";
import { Link } from "react-router-dom";

import '../home.css';
const NavBar =()=>{
    return             <div id="navbar" className="nav-card">
    <div className="menu-logo">
        <div className="gg-menu-left "></div>
        <h2>EvoHealth</h2>
    </div>
    <ul>
        <li><Link to = "/dashboard"><a href="">Personal Analysis</a></Link></li>
        <li><Link to = "hospital-reports"><a href="">Hospital Reports</a></Link></li>
        <li><Link to = "/upload"><a href="">Upload Reports</a></Link></li>
        <li><Link to = "/health-ai"><a href="">MediGuide AI</a></Link></li>


    </ul>
</div>
} 
export default NavBar