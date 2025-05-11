"use client"

import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import RobotCard from "../components/RobotCard"
import BookingDialog from "../components/BookingDialog"

import { useAuth } from "../AuthContext"

import FifishV6 from "../assets/fifish-v6.png"
import UR5e from "../assets/ur5e.png"
import Spot from "../assets/spot.png"

function RobotsSection() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedRobot, setSelectedRobot] = useState(null)

  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const robots = [
    { id: 1, image: FifishV6, title: "FIFISH V6", description: "Marine robot" },
    { id: 2, image: UR5e, title: "UR5e", description: "Lightweight, versatile cobot" },
    { id: 3, image: Spot, title: "Spot", description: "Quadrupedal robot" },
  ]

  // Check if the URL has ?openBooking=true
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const shouldOpen = queryParams.get("openBooking") === "true"

    if (shouldOpen) {
      if (!user) {
        alert("Please log in to book a robot.")
        navigate("/login")
      } else {
        setSelectedRobot(robots[0]) // default to first robot
        setIsBookingOpen(true)
      }
    }
  }, [location.search, user, navigate])

  const handleBookClick = (robot) => {
    if (!user) {
      alert("Please log in to book a robot.")
      navigate("/login")
      return
    }

    setSelectedRobot(robot)
    setIsBookingOpen(true)
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <Header />

      <section className="w-full py-12 px-16 bg-background">
        <h1 className="font-outfit font-semibold text-primary-text text-5xl mb-10 text-center">Our Robots</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {robots.map((robot) => (
            <RobotCard
              key={robot.id}
              image={robot.image}
              title={robot.title}
              description={robot.description}
              onBookClick={() => handleBookClick(robot)}
            />
          ))}
        </div>
      </section>

      {/* {user && ( */}
        <BookingDialog
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          robots={robots}
          selectedRobot={selectedRobot}
        />
      {/* )} */}

      <Footer />
    </main>
  )
}

export default RobotsSection
