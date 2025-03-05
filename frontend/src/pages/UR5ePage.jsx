import { useState } from "react";
import BookingModal from "../components/BookingModal";
import { useNavigate } from "react-router-dom";

export default function UR5ePage() {
  const [openBooking, setOpenBooking] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="pt-16 p-8 max-w-4xl mx-auto text-center bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">UR5e - Lightweight, Versatile Robot</h1>
      <img src="/images/ur5e.jpg" alt="UR5e Robot" className="w-full rounded-lg mb-6" />

      <p className="mb-6">
        The <strong>UR5e</strong> is a flexible, lightweight <strong>collaborative robot (cobot)</strong> designed for various industrial applications.
        It has a <strong>payload of 5 kg</strong> and an <strong>operating radius of 850 mm</strong>, making it ideal for tasks requiring precision.
      </p>

      <h3 className="text-2xl font-semibold mb-4">Key Features:</h3>
      <ul className="list-none space-y-2 mb-6">
        <li>✅ <strong>Payload Capacity</strong>: 5 kg</li>
        <li>✅ <strong>Reach</strong>: 850 mm</li>
        <li>✅ <strong>Repeatability</strong>: ±0.03 mm</li>
        <li>✅ <strong>Power Consumption</strong>: ~350W</li>
        <li>✅ <strong>Applications</strong>: Assembly, packaging, pick-and-place, machine tending</li>
      </ul>

      <div className="flex justify-center gap-4 mt-6">
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-md"
          onClick={() => navigate("/robots/ur5e/control")}
        >
          Control UR5e
        </button>

        <button
          className="bg-green-500 text-white py-2 px-6 rounded-md"
          onClick={() => setOpenBooking(true)}
        >
          Book UR5e
        </button>
      </div>

      <BookingModal open={openBooking} onClose={() => setOpenBooking(false)} robotName="UR5e" />
    </div>
  );
}
