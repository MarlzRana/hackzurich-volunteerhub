import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LandingPage from './pages/landing/LandingPage';
import Login from './pages/authentication/Login';
import Register from './pages/authentication/Register';
import Onboarding from './pages/onboarding/Onboarding';
import { useEffect, useState } from 'react';
import { isAuthenticated, logout } from './services/auth.service';
import Dashboard from './pages/dashboard/Dashboard';
import OrganisationDashboard from './pages/organisation-dashboard/OrganisationDashboard';

const charityOnboardingQuestions = [
  {name: "What is the name of your organisation?", type: "simple", required: true, placeholder: "", api: "name"},
  {name: "Tell our volunteers a bit about your organisation", type: "full", required: true, placeholder: "", api: "bio"},
  {name: "What tags would you associate with your organisation? This will help us connect you with volunteers that most fit your organisation.", type: "tags", required: true, api: "tags"},
  {name: "What locations does your organisation work in? This will help us connect you with volunteers in your area. Please enter cities and towns.", type: "tags", required: true, api: "location"},
  {name: "Do you have a profile picture?", type: "image", required: false, api: "upload"},
];

const userOnboardingQuestions = [
  {name: "Tell us a little more about yourself", type: "full", required: false, placeholder: "Your bio", api: "bio"},
  {name: "What are your social links?", type: "socials", required: false, api: "socials"},
  {name: "What locations are you able to volunteer in? This will help us connect you with charities in your area. Please enter cities and towns.", type: "tags", required: true, api: "location"},
  {name: "What types of organisations are you looking for? Please enter tags to help us show you relevant organisations (ie. homelessness, graffiti, disabled, etc)", type: "tags", required: false, api: "tags"}
]

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const accountType = localStorage.getItem("accountType");

  const handleLogout = () => {
    localStorage.clear();
    logout();
    setIsLoggedIn(false);
  }

  useEffect(() => {
    isAuthenticated()
    .then((res) => {
      if (res.data.isAuthenticated) setIsLoggedIn(true);
    });
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/onboarding/volunteer" element={<Onboarding type="user" questions={ userOnboardingQuestions } isLoggedIn={isLoggedIn} />} />
        <Route path="/onboarding/charity" element={<Onboarding type="charity" questions={ charityOnboardingQuestions } isLoggedIn={isLoggedIn} />} />
        <Route path="/dashboard/*" element={accountType === "organisation" ? <OrganisationDashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} handleLogout={handleLogout} /> : <Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} handleLogout={handleLogout} /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
