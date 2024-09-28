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
import { useEffect } from "react";
import useStore from "./store.tsx";
import api from "./axiosConfig.tsx";

function App() {
  const { userId, setOnlineStatus } = useStore();

  const updateStatus = (status: "online" | "offline") => {
    api
      .patch(`api/v1/user/status/setStatus`, {
        userId,
        status,
      })
      .then(() => {
        setOnlineStatus(status);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const location = useLocation();
  const url = "/chat";
  useEffect(() => {
    if (location.pathname === url) {
      updateStatus("online");
    } else {
      updateStatus("offline");
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
