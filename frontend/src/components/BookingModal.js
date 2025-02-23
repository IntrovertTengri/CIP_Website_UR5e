import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
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

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Book {robotName}</DialogTitle>
      <DialogContent>
        {/* Select Date */}
        <h3>Select Date</h3>
        <Calendar value={selectedDate} onChange={setSelectedDate} locale="en-US"/>

        {/* Select Time */}
        <h3>Select Time</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
          {timeSlots.map((slot) => (
            <Button
              key={slot}
              variant={selectedTime === slot ? "contained" : "outlined"}
              onClick={() => setSelectedTime(slot)}
            >
              {slot}
            </Button>
          ))}
        </div>

        {/* Book Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleBooking}
          disabled={!selectedTime}
          style={{ marginTop: "20px", width: "100%" }}
        >
          Book
        </Button>
      </DialogContent>
    </Dialog>
  );
}
