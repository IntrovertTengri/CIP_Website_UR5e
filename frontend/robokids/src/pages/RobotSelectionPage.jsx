import { Button } from "@mui/material";
import { useState } from "react";
import BookingModal from "../../robokids/src/components/BookingModal";
import { useNavigate } from "react-router-dom";

export default function UR5ePage() {
  const [openBooking, setOpenBooking] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto", textAlign: "center" }}>
      <h1>UR5e - Lightweight, Versatile Robot</h1>
      <img src="/images/ur5e.jpg" alt="UR5e Robot" style={{ width: "100%", borderRadius: "10px" }} />

      <p>
        The <strong>UR5e</strong> is a flexible, lightweight <strong>collaborative robot (cobot)</strong> designed for various industrial applications.
        It has a <strong>payload of 5 kg</strong> and an <strong>operating radius of 850 mm</strong>, making it ideal for tasks requiring precision.
      </p>

      <h3>Key Features:</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>✅ <strong>Payload Capacity</strong>: 5 kg</li>
        <li>✅ <strong>Reach</strong>: 850 mm</li>
        <li>✅ <strong>Repeatability</strong>: ±0.03 mm</li>
        <li>✅ <strong>Power Consumption</strong>: ~350W</li>
        <li>✅ <strong>Applications</strong>: Assembly, packaging, pick-and-place, machine tending</li>
      </ul>

      {/* Buttons */}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "15px" }}>
        <Button variant="contained" color="primary" onClick={() => navigate("/robots/ur5e/control")}>
          Control UR5e
        </Button>

        <Button variant="contained" color="secondary" onClick={() => setOpenBooking(true)}>
          Book UR5e
        </Button>
      </div>

      {/* Booking Modal (Reusable for any robot) */}
      <BookingModal open={openBooking} onClose={() => setOpenBooking(false)} robotName="UR5e" />
    </div>
  );
}
