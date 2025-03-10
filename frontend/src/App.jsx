import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RobotSelectionPage from "./pages/RobotSelectionPage";
import UR5ePage from "./pages/UR5ePage";
import UR5eControlPage from "./pages/UR5eControlPage";
import AuthPage from "./pages/AuthPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<AuthPage isSignUp={false} />} />
          <Route path="/signup" element={<AuthPage isSignUp={true} />} />
          <Route path="/robots" element={<RobotSelectionPage />} />
          <Route path="/robots/ur5e" element={<UR5ePage />} />
          <Route path="/robots/ur5e/control" element={<UR5eControlPage />} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}