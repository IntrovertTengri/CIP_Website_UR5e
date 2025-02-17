import { useState } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";

export default function RobotController() {
  const [position, setPosition] = useState({ x: "", y: "", z: "", rx: "", ry: "", rz: "" });
  const [open, setOpen] = useState(false); 
  const [file, setFile] = useState(null);  
  const [scriptText, setScriptText] = useState("");  

  // Function to send coordinate-based movement command
  const moveRobot = async () => {
    console.log("Sending move request:", position);

    try {
      const response = await fetch("http://127.0.0.1:8000/move-robot/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(position),
      });

      const data = await response.json();
      console.log("Response from backend:", data);

      setOpen(true);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  // Function to upload a script file
  const uploadScript = async () => {
    if (!file) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload-script/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Script upload response:", data);
      setOpen(true);
    } catch (error) {
      console.error("Error uploading script:", error);
    }
  };

  // Function to send script text as form data
  const sendScriptText = async () => {
    if (!scriptText.trim()) {
      console.error("No script text entered.");
      return;
    }

    const formData = new FormData();
    formData.append("script", scriptText); 

    try {
      const response = await fetch("http://127.0.0.1:8000/upload-script/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Script text send response:", data);
      setOpen(true);
    } catch (error) {
      console.error("Error sending script text:", error);
    }
  };

  return (
    <div>
      <h2>Enter Robot Coordinates</h2>
      <TextField label="X" onChange={(e) => setPosition({ ...position, x: e.target.value })} />
      <TextField label="Y" onChange={(e) => setPosition({ ...position, y: e.target.value })} />
      <TextField label="Z" onChange={(e) => setPosition({ ...position, z: e.target.value })} />
      <TextField label="Rx" onChange={(e) => setPosition({ ...position, rx: e.target.value })} />
      <TextField label="Ry" onChange={(e) => setPosition({ ...position, ry: e.target.value })} />
      <TextField label="Rz" onChange={(e) => setPosition({ ...position, rz: e.target.value })} />
      <Button variant="contained" onClick={moveRobot}>Move Robot</Button>

      <h2>Upload a URScript File</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <Button variant="contained" onClick={uploadScript}>Upload Script</Button>

      <h2>Or Enter Script Manually</h2>
      <TextField
        label="Enter URScript Here"
        multiline
        rows={4}
        fullWidth
        onChange={(e) => setScriptText(e.target.value)}
      />
      <Button variant="contained" onClick={sendScriptText}>Send Script</Button>

      {/* Snackbar Notification */}
      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success">
          Action completed successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}
