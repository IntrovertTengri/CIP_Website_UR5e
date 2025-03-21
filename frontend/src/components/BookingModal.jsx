import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function BookingModal({ open, onClose, robotName }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const timeSlots = ["10:00 - 12:00", "12:00 - 14:00", "14:00 - 16:00", "16:00 - 18:00"];

  const handleBooking = async () => {
    if (!selectedTime) return;
    const userId = localStorage.getItem("user_id"); // Assuming user is logged in
  
    if (!userId) {
      alert("Please log in to book.");
      return;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:8000/book-robot/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          robot_name: robotName,
          date: selectedDate.toISOString().split("T")[0],
          time_slot: selectedTime,
        }),
      });
  
      const data = await response.json();
      
      if (response.ok) {
        alert("Booking confirmed!");
        onClose();
      } else {
        alert(data.detail || "Failed to book.");
      }
    } catch (error) {
      alert("Error connecting to server.");
    }
  };

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 bg-opacity-60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Book {robotName}</h2>
        
        {/* Select Date */}
        <h3 className="text-lg font-semibold mb-2">Select Date</h3>
        <div className="max-w-xs mx-auto">
          <Calendar value={selectedDate} onChange={setSelectedDate} locale="en-US" />
        </div>

        {/* Select Time */}
        <h3 className="text-lg font-semibold mt-4 mb-2">Select Time</h3>
        <div className="flex flex-col gap-2">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              className={`p-2 rounded-md border ${selectedTime === slot ? 'bg-blue-500 text-white' : 'bg-white text-black border-gray-300'}`}
              onClick={() => setSelectedTime(slot)}
            >
              {slot}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {errorMessage && <p className="text-red-500 mt-2 text-center">{errorMessage}</p>}

        {/* Book Button */}
        <button
          onClick={handleBooking}
          disabled={!selectedTime || loading}
          className="bg-green-500 text-white py-2 px-4 rounded-md w-full mt-4 disabled:bg-gray-400"
        >
          {loading ? "Booking..." : "Book"}
        </button>

        <button
          onClick={onClose}
          className="text-red-500 mt-4 w-full underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
