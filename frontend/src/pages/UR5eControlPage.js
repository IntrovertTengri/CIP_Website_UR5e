import { useState } from "react";
import { Button, TextField, Snackbar, Alert, Typography } from "@mui/material";

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
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <Typography variant="h4">UR5e Robot Control</Typography>

      {/* Movement Controls */}
      <Typography variant="h6">Move Robot by Coordinates</Typography>
      {["x", "y", "z", "rx", "ry", "rz"].map((axis) => (
        <TextField
          key={axis}
          label={axis.toUpperCase()}
          name={axis}
          type="number"
          value={position[axis]}
          onChange={handlePositionChange}
          style={{ margin: "5px", width: "120px" }}
        />
      ))}

      <Button variant="contained" onClick={moveRobot} style={{ marginTop: "10px" }}>
        Move Robot
      </Button>

      {/* Script Upload and Text Input */}
      <Typography variant="h6" style={{ marginTop: "20px" }}>Send URScript</Typography>
      <input type="file" onChange={handleFileChange} style={{ marginBottom: "10px" }} />

      <TextField
        label="Or enter script text"
        multiline
        rows={4}
        fullWidth
        value={scriptText}
        onChange={handleTextChange}
      />

      <Button variant="contained" onClick={sendScript} style={{ marginTop: "10px" }}>
        Send Script
      </Button>

      {/* Snackbar Notification */}
      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
