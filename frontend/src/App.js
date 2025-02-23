import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RobotSelectionPage from "./pages/RobotSelectionPage";
import UR5ePage from "./pages/UR5ePage";
import UR5eControlPage from "./pages/UR5eControlPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RobotSelectionPage />} />  {/* Default Home Page */}
        <Route path="/robots" element={<RobotSelectionPage />} />
        <Route path="/robots/ur5e" element={<UR5ePage />} />
        <Route path="/robots/ur5e/control" element={<UR5eControlPage />} />
      </Routes>
    </Router>
  );
}

export default App;
