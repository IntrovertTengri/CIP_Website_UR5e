import { useState, useEffect, useRef } from "react";

export default function RobotController() {
  const [controlMode, setControlMode] = useState("panel");
  const [joints, setJoints] = useState({ J1: -1.57, J2: -1.57, J3: 1.57, J4: -1.57, J5: 1.57, J6: 0 });
  const [position, setPosition] = useState({ J1: "", J2: "", J3: "", J4: "", J5: "", J6: "" });
  const [buttonState, setButtonState] = useState({
    J1Plus: false, J1Minus: false,
    J2Plus: false, J2Minus: false,
    J3Plus: false, J3Minus: false,
    J4Plus: false, J4Minus: false,
    J5Plus: false, J5Minus: false,
    J6Plus: false, J6Minus: false
  });
  const [scriptText, setScriptText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [currentPosition, setCurrentPosition] = useState(null);
  
  const STEP = 0.05;
  const INTERVAL = 100;

  const jointInfo = {
    J1: "J1",
    J2: "J2",
    J3: "J3",
    J4: "J4",
    J5: "J5",
    J6: "J6"
  };

  // Reference for movement timer
  const movementTimerRef = useRef(null);

  // Fetch current robot position on component mount
  useEffect(() => {
    fetchRobotPosition();
  }, []);

  useEffect(() => {
    // Clear any existing timer
    if (movementTimerRef.current) {
      clearInterval(movementTimerRef.current);
    }

    // Set up new timer for continuous movement
    movementTimerRef.current = setInterval(() => {
      let moved = false;
      let newJoints = { ...joints };

      if (buttonState.J1Plus) { newJoints.J1 += STEP; moved = true; }
      if (buttonState.J1Minus) { newJoints.J1 -= STEP; moved = true; }
      if (buttonState.J2Plus) { newJoints.J2 += STEP; moved = true; }
      if (buttonState.J2Minus) { newJoints.J2 -= STEP; moved = true; }
      if (buttonState.J3Plus) { newJoints.J3 += STEP; moved = true; }
      if (buttonState.J3Minus) { newJoints.J3 -= STEP; moved = true; }
      if (buttonState.J4Plus) { newJoints.J4 += STEP; moved = true; }
      if (buttonState.J4Minus) { newJoints.J4 -= STEP; moved = true; }
      if (buttonState.J5Plus) { newJoints.J5 += STEP; moved = true; }
      if (buttonState.J5Minus) { newJoints.J5 -= STEP; moved = true; }
      if (buttonState.J6Plus) { newJoints.J6 += STEP; moved = true; }
      if (buttonState.J6Minus) { newJoints.J6 -= STEP; moved = true; }

      if (moved) {
        Object.keys(newJoints).forEach(joint => {
          newJoints[joint] = Math.max(-Math.PI, Math.min(Math.PI, newJoints[joint]));
        });
        
        setJoints(newJoints);
        sendJointMove(newJoints);
      }
    }, INTERVAL);

    return () => {
      if (movementTimerRef.current) {
        clearInterval(movementTimerRef.current);
      }
    };
  }, [buttonState, joints]);

  const fetchRobotPosition = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/robot/position/");
      const data = await response.json();
      setCurrentPosition(data);
    } catch (error) {
      setMessage("Failed to fetch robot position!");
    }
  };

  const handleButtonDown = (buttonId) => {
    setButtonState(prev => ({ ...prev, [buttonId]: true }));
  };

  const handleButtonUp = (buttonId) => {
    setButtonState(prev => ({ ...prev, [buttonId]: false }));
  };

  const handlePositionChange = (event) => {
    setPosition({ ...position, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const sendJointMove = async (jointPositions) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/robot/move-joints/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jointPositions),
      });
      await response.json();
    } catch (error) {
      console.error("Error moving robot joints:", error);
      setMessage("Failed to move robot joints!");
    }
  };

  const sendScriptToRobot = async (script) => {
    try {
      const formData = new FormData();
      formData.append("script", script);
      
      await fetch("http://127.0.0.1:8000/files/upload/", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.error("Error sending script:", error);
    }
  };

  const moveRobot = async () => {
    const data = controlMode === "panel" 
      ? { x: 0, y: 0, z: 0, rx: joints.J4, ry: joints.J5, rz: joints.J6 }
      : position;
    
    try {
      const response = await fetch("http://127.0.0.1:8000/robot/move/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      await response.json();
      setMessage("Robot moved successfully!");
    } catch (error) {
      setMessage("Failed to move robot!");
    }
  };

  const sendScript = async () => {
    const formData = new FormData();
  
    if (selectedFile) {
      formData.append("file", selectedFile);
    } else if (scriptText.trim()) {
      formData.append("script", scriptText);
    } else {
      setMessage("Please upload a file or enter script text.");
      return;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:8000/files/upload", { 
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Failed to send script!");
    }
  };
  

  const radToDeg = (rad) => {
    return Math.round(rad * (180 / Math.PI) * 100) / 100;
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">UR5e Robot Control</h2>

      <div className="flex justify-between mb-4">
        <button
          className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
          onClick={() => setControlMode(controlMode === "panel" ? "manual" : "panel")}
        >
          Switch to {controlMode === "panel" ? "Manual Input" : "Control Panel"}
        </button>
        
        <button
          className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg"
          onClick={fetchRobotPosition}
        >
          Refresh Position
        </button>
      </div>

      {currentPosition && (
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <h3 className="font-semibold mb-2">Current Robot Position:</h3>
          <p>X: {currentPosition.x.toFixed(4)}, Y: {currentPosition.y.toFixed(4)}, Z: {currentPosition.z.toFixed(4)}</p>
        </div>
      )}

      {controlMode === "panel" ? (
        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-6 text-center">Gamepad Control Panel</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.keys(joints).map((joint) => (
              <div key={joint} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold">{joint}: {jointInfo[joint]}</h3>
                  <span className="px-2 py-1 bg-blue-100 rounded text-blue-800 font-mono">
                    {radToDeg(joints[joint])}°
                  </span>
                </div>
                
                <div className="flex justify-between mt-4">
                  <button
                    onMouseDown={() => handleButtonDown(`${joint}Minus`)}
                    onMouseUp={() => handleButtonUp(`${joint}Minus`)}
                    onMouseLeave={() => handleButtonUp(`${joint}Minus`)}
                    onTouchStart={() => handleButtonDown(`${joint}Minus`)}
                    onTouchEnd={() => handleButtonUp(`${joint}Minus`)}
                    className={`px-4 py-2 ${buttonState[`${joint}Minus`] ? 'bg-red-600' : 'bg-red-500'} text-white rounded-lg flex-1 mr-2 font-bold text-xl hover:bg-red-600`}
                  >
                    −
                  </button>
                  <button
                    onMouseDown={() => handleButtonDown(`${joint}Plus`)}
                    onMouseUp={() => handleButtonUp(`${joint}Plus`)}
                    onMouseLeave={() => handleButtonUp(`${joint}Plus`)}
                    onTouchStart={() => handleButtonDown(`${joint}Plus`)}
                    onTouchEnd={() => handleButtonUp(`${joint}Plus`)}
                    className={`px-4 py-2 ${buttonState[`${joint}Plus`] ? 'bg-green-600' : 'bg-green-500'} text-white rounded-lg flex-1 ml-2 font-bold text-xl hover:bg-green-600`}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">Current Joint Configuration (radians):</h3>
            <code className="block bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
              {JSON.stringify(joints, null, 2)}
            </code>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4 text-center">Manual Cartesian Input</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.keys(position).map((axis) => (
              <div key={axis} className="flex flex-col">
                <label className="mb-1 font-medium">{axis.toUpperCase()}</label>
                <input
                  type="number"
                  name={axis}
                  placeholder={axis.toUpperCase()}
                  value={position[axis]}
                  onChange={handlePositionChange}
                  className="p-2 border rounded-md w-full"
                  step="0.01"
                />
              </div>
            ))}
          </div>
          
          <button 
            onClick={moveRobot} 
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium mt-4"
          >
            Move Robot
          </button>
        </div>
      )}

      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Send URScript</h3>
        
        <div className="mb-4">
          <label className="block mb-2">Upload Script File</label>
          <input 
            type="file" 
            onChange={handleFileChange} 
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Or Enter Script Text</label>
          <textarea
            placeholder="Enter URScript code here..."
            rows={6}
            value={scriptText}
            onChange={(e) => setScriptText(e.target.value)}
            className="p-3 border rounded-md w-full font-mono text-sm"
          />
        </div>

        <button 
          onClick={sendScript} 
          className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-medium text-lg"
        >
          Send Script
        </button>
      </div>

      {message && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-4 rounded-md shadow-lg flex items-center">
          <span>{message}</span>
          <button 
            onClick={() => setMessage("")} 
            className="ml-4 text-red-400 hover:text-red-300"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}