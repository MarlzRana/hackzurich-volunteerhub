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
import { useState } from 'react';

const charityOnboardingQuestions = [
  {name: "Tell our volunteers a bit about your organisation", type: "full", required: true, placeholder: ""},
  {name: "What tags would you associate with your organisation? This will help us connect you with volunteers that most fit your organisation.", type: "tags", required: true}
];

const userOnboardingQuestions = [
  {name: "Tell us a little more about yourself", type: "full", required: false, placeholder: "Your bio"}
]

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/onboarding/user" element={<Onboarding type="user" questions={ userOnboardingQuestions } isLoggedIn={isLoggedIn} />} />
        <Route path="/onboarding/charity" element={<Onboarding type="charity" questions={ charityOnboardingQuestions } isLoggedIn={isLoggedIn} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
