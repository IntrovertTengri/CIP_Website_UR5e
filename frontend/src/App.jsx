import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RobotSelectionPage from "./pages/RobotSelectionPage";
import UR5ePage from "./pages/UR5ePage";
import UR5eControlPage from "./pages/UR5eControlPage";
import AuthPage from "./pages/AuthPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./PrivateRoute"; // ✅

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage isSignUp={true} />} />
          <Route path="/robots" element={<RobotSelectionPage />} />
          
          {/* 🔐 Protected routes */}
          <Route
            path="/robots/ur5e"
            element={
              <PrivateRoute>
                <UR5ePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/robots/ur5e/control"
            element={
              <PrivateRoute>
                <UR5eControlPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}
