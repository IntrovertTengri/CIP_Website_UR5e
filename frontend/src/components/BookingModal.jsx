import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function BookingModal({ open, onClose, robotName }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const timeSlots = ["10:00 - 12:00", "12:00 - 14:00", "14:00 - 16:00", "16:00 - 18:00"];

  const handleBooking = () => {
    alert(`Booked ${robotName} for ${selectedDate.toDateString()} at ${selectedTime}`);
    onClose();
  };

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50"
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

        {/* Book Button */}
        <button
          onClick={handleBooking}
          disabled={!selectedTime}
          className="bg-green-500 text-white py-2 px-4 rounded-md w-full mt-4 disabled:bg-gray-400"
        >
          Book
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
