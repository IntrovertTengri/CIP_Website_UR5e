import { useState } from "react";

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
    <div className="p-8 max-w-md mx-auto">
      <h3 className="text-2xl font-bold mb-4">Move the UR5e Robot</h3>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {['x', 'y', 'z', 'rx', 'ry', 'rz'].map((axis) => (
          <input
            key={axis}
            type="number"
            placeholder={axis.toUpperCase()}
            onChange={(e) => setPosition({ ...position, [axis]: e.target.value })}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        ))}
      </div>
      <button
        onClick={moveRobot}
        className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mb-4"
      >
        Move Robot
      </button>

      {open && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-md">
          Robot moved successfully!
          <button onClick={() => setOpen(false)} className="ml-4 text-white underline">
            Close
          </button>
        </div>
      )}
    </div>
  );
}
