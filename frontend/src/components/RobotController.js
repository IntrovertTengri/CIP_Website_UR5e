import { useState } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";

export default function RobotController() {
  const [position, setPosition] = useState({ x: "", y: "", z: "", rx: "", ry: "", rz: "" });
  const [open, setOpen] = useState(false);

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

  return (
    <div>
      <h3>Move the UR5e Robot</h3>
      <TextField label="X" onChange={(e) => setPosition({ ...position, x: e.target.value })} />
      <TextField label="Y" onChange={(e) => setPosition({ ...position, y: e.target.value })} />
      <TextField label="Z" onChange={(e) => setPosition({ ...position, z: e.target.value })} />
      <TextField label="Rx" onChange={(e) => setPosition({ ...position, rx: e.target.value })} />
      <TextField label="Ry" onChange={(e) => setPosition({ ...position, ry: e.target.value })} />
      <TextField label="Rz" onChange={(e) => setPosition({ ...position, rz: e.target.value })} />

      <Button variant="contained" onClick={moveRobot}>Move Robot</Button>

      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success">
          Robot moved successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}
