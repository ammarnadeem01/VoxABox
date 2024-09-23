import { Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Importing Components
import LandingPage from "./Custom/LandingPage/LandingPage.tsx";
import Navbar from "./Custom/LandingPage/Navbar.tsx";
import Footer from "./Custom/LandingPage/Footer.tsx";
import Login from "./Custom/User/Login.tsx";
import Signup from "./Custom/User/Signup.tsx";
import MessagingPanel from "./Custom/Chat/MessagingPanel.tsx";
import TermsAndConditions from "./Custom/LandingPage/TermsAndConditions.tsx";
import PrivacyPolicy from "./Custom/LandingPage/PrivacyPolicy.tsx";
import { useEffect, useState } from "react";

function App() {
  const [isOnline, setIsOnline] = useState(false);
  const location = useLocation();
  const url = "http://localhost:5173/chat";
  useEffect(() => {
    if (location.pathname === url) {
      setIsOnline(true);
    } else {
      setIsOnline(false);
    }
  }, [location]);
  const showFooter =
    location.pathname !== "/chat" &&
    location.pathname !== "/termsnconditions" &&
    location.pathname !== "/privacypolicy";
  return (
    <div className="bg-black min-h-screen">
      {showFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<MessagingPanel />} />
        <Route path="/termsnconditions" element={<TermsAndConditions />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
      </Routes>

      {showFooter && <Footer />}
    </div>
  );
}

export default App;
