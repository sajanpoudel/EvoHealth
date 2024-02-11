import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './style.css'
import Home from './views/home'
import NotFound from './views/not-found'
import Login from './login/login'
//After Login
import Upload from './DashBoard/Upload/upload'
import Dashboard from './DashBoard/dashboard'
import Hospital from './DashBoard/hospital'
import Profile from './DashBoard/Profile/profile'
import HealthAI from './DashBoard/HealthAI/healthai'
// Testing Purpose
const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Home} exact path="/" />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/hospital-reports" component={Hospital} />


        <Route path="/upload" component={Upload} />
        <Route path = "/profile" component ={Profile}/>
        <Route path = "/health-ai" component ={HealthAI}/>

 
        // Testing Purpose



        //Testing Purpose
        <Route component={NotFound} path="**" />
        <Redirect to="**" />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))