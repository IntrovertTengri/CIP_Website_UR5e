import { useState } from "react";

export default function RobotController() {
  const [position, setPosition] = useState({ x: "", y: "", z: "", rx: "", ry: "", rz: "" });
  const [scriptText, setScriptText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handlePositionChange = (event) => {
    setPosition({ ...position, [event.target.name]: event.target.value });
  };

  const handleTextChange = (event) => {
    setScriptText(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const moveRobot = async () => {
    console.log("Sending move request:", position);

    try {
      const response = await fetch("http://127.0.0.1:8000/robot/move/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(position),
      });

      const data = await response.json();
      console.log("Response from backend:", data);
      setMessage("Robot moved successfully!");
      setOpen(true);
    } catch (error) {
      console.error("Error sending request:", error);
      setMessage("Failed to move robot!");
      setOpen(true);
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
      setOpen(true);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/files/upload/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Script sent:", data);
      setMessage("Script sent successfully!");
      setOpen(true);
    } catch (error) {
      console.error("Error sending script:", error);
      setMessage("Failed to send script!");
      setOpen(true);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">UR5e Robot Control</h2>

      <h3 className="text-xl font-semibold mb-2">Move Robot by Coordinates</h3>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {["x", "y", "z", "rx", "ry", "rz"].map((axis) => (
          <input
            key={axis}
            type="number"
            name={axis}
            placeholder={axis.toUpperCase()}
            value={position[axis]}
            onChange={handlePositionChange}
            className="p-2 border rounded-md w-full"
          />
        ))}
      </div>

      <button onClick={moveRobot} className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4">
        Move Robot
      </button>

      <h3 className="text-xl font-semibold mb-2">Send URScript</h3>
      <input type="file" onChange={handleFileChange} className="mb-4" />

      <textarea
        placeholder="Or enter script text"
        rows={4}
        value={scriptText}
        onChange={handleTextChange}
        className="p-2 border rounded-md w-full mb-4"
      />

      <button onClick={sendScript} className="bg-green-500 text-white py-2 px-4 rounded-md mb-4">
        Send Script
      </button>

      {open && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-4 rounded-md">
          {message}
          <button onClick={() => setOpen(false)} className="ml-4 text-red-500">Close</button>
        </div>
      )}
    </div>
  );
}
