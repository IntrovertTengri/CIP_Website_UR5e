"use client"

import { useState } from "react"

function BookingDialog({ isOpen, onClose, robots, selectedRobot }) {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [selectedRobotId, setSelectedRobotId] = useState(selectedRobot?.id || "")

  // Generate calendar days for January 2025
  const generateCalendarDays = () => {
    const days = []
    const daysInMonth = 31 // January has 31 days
    const firstDayOfMonth = 3 // Wednesday (0 = Sunday, 1 = Monday, etc.)

    // Add previous month days
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: 27 + i, isCurrentMonth: false })
    }

    // Add current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true })
    }

    // Add next month days to fill the grid
    const remainingDays = 7 - (days.length % 7)
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        days.push({ day: i, isCurrentMonth: false })
      }
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  const timeSlots = ["12:00 - 14:00", "12:00 - 14:00", "12:00 - 14:00", "12:00 - 14:00", "12:00 - 14:00"]

  const handleBooking = () => {
    console.log("Booking:", {
      robot: robots.find((r) => r.id === selectedRobotId),
      date: selectedDate,
      time: selectedTime,
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Booking</h2>

            {/* Robot Selection */}
            <div className="mb-6">
              <label className="block text-lg mb-2">Select robot</label>
              <div className="relative">
                <select
                  className="w-full p-3 border rounded-md appearance-none pr-10"
                  value={selectedRobotId}
                  onChange={(e) => setSelectedRobotId(e.target.value)}
                >
                  {robots.map((robot) => (
                    <option key={robot.id} value={robot.id}>
                      {robot.title}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div>
              <label className="block text-lg mb-2">Select date</label>
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-1">
                    <button className="p-1">&laquo;</button>
                    <button className="p-1">&lsaquo;</button>
                  </div>
                  <div className="font-medium">January 2025</div>
                  <div className="flex gap-1">
                    <button className="p-1">&rsaquo;</button>
                    <button className="p-1">&raquo;</button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {/* Weekday headers */}
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <div key={day} className="text-center text-sm py-1">
                      {day}
                    </div>
                  ))}

                  {/* Calendar days */}
                  {calendarDays.map((day, index) => (
                    <button
                      key={index}
                      className={`
                        h-8 w-8 flex items-center justify-center rounded-full text-sm
                        ${!day.isCurrentMonth ? "text-gray-300" : ""}
                        ${selectedDate === day.day && day.isCurrentMonth ? "bg-blue-500 text-white" : ""}
                        ${day.day === 23 && day.isCurrentMonth ? "bg-blue-500 text-white" : ""}
                        ${day.day === 22 && day.isCurrentMonth ? "border border-blue-500" : ""}
                      `}
                      onClick={() => day.isCurrentMonth && setSelectedDate(day.day)}
                    >
                      {day.day}
                    </button>
                  ))}
                </div>

                <div className="mt-4 text-center">
                  <button className="text-blue-500 text-sm">Today</button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <h3 className="text-lg mb-4">Select time</h3>
            <div className="space-y-3">
              {timeSlots.map((time, index) => (
                <button
                  key={index}
                  className={`
                    w-full p-3 rounded-md text-left
                    ${selectedTime === time ? "bg-blue-500 text-white" : "bg-gray-100"}
                    ${index === 1 ? "bg-gray-100" : ""}
                  `}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>

            <button
              className="w-full bg-blue-500 text-white rounded-md py-4 mt-8 font-medium text-lg"
              onClick={handleBooking}
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingDialog
