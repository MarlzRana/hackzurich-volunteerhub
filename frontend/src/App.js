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

const charityOnboardingQuestions = [
  {name: "What is the name of your organisation?", type: "simple", required: true, placeholder: "", api: "name"},
  {name: "Tell our volunteers a bit about your organisation", type: "full", required: true, placeholder: "", api: "bio"},
  {name: "What tags would you associate with your organisation? This will help us connect you with volunteers that most fit your organisation.", type: "tags", required: true, api: "tags"},
  {name: "What locations does your organisation work in? This will help us connect you with volunteers in your area. Please enter cities and towns.", type: "tags", required: true, api: "location"},
  {name: "Do you have a profile picture?", type: "image", required: false, api: "name"},
];

const userOnboardingQuestions = [
  {name: "Tell us a little more about yourself", type: "full", required: false, placeholder: "Your bio"}
]

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
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
        <Route path="/onboarding/user" element={<Onboarding type="user" questions={ userOnboardingQuestions } isLoggedIn={isLoggedIn} />} />
        <Route path="/onboarding/charity" element={<Onboarding type="charity" questions={ charityOnboardingQuestions } isLoggedIn={isLoggedIn} />} />
        <Route path="/dashboard/*" element={<Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} handleLogout={handleLogout} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
