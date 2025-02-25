import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoboKidsLogo from "./assets/robokids-logo.svg";
import HeroRobot from "./assets/hero-robot.png";
import Header from "./components/Header";
import RobotSelectionPage from "./pages/RobotSelectionPage";
import UR5ePage from "./pages/UR5ePage";
import UR5eControlPage from "./pages/UR5eControlPage";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <main className="flex flex-col items-center justify-center">
              {/* Hero Section */}
              <section className="h-screen w-full px-16 bg-linear-to-b from-background to-background-gradient">
                {/* Hero Content */}
                <div className="flex flex-col items-center justify-center mt-20 h-full">
                  <h1 className="text-primary-text font-outfit font-extrabold text-7xl text-center">
                    Control Robots from Anywhere
                  </h1>
                  <button className="border border-accent rounded-lg px-5 py-2 bg-accent mt-15">
                    <p className="text-background text-base font-medium font-outfit">Continue</p>
                  </button>

                  <div className="flex flex-col items-center mt-10 h-full border-2 border-gray-300 rounded-t-4xl px-25 bg-background">
                    {/* RoboKids Branding */}
                    <div className="flex items-center gap-1 my-7">
                      <img src={RoboKidsLogo} alt="RoboKids Logo" className="h-9" />
                      <h1 className="font-outfit font-bold text-4xl text-accent">RoboKids</h1>
                    </div>
                    <img src={HeroRobot} alt="Hero Robot" className="rounded-2xl h-70" />
                  </div>
                </div>
              </section>
            </main>
          }
        />
        
        <Route path="/robots" element={<RobotSelectionPage />} />
        <Route path="/robots/ur5e" element={<UR5ePage />} />
        <Route path="/robots/ur5e/control" element={<UR5eControlPage />} />
      </Routes>
    </Router>
  );
}
