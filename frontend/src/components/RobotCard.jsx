"use client"

function RobotCard({ image, title, description, onBookClick }) {
  return (
    <div className="bg-gray-100 rounded-lg p-4 flex flex-col h-full">
      <div className="flex-1 flex items-center justify-center p-4">
        <img src={image || "/placeholder.svg"} alt={title} className="object-contain max-h-48" />
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-bold font-outfit">{title}</h2>
        <p className="text-gray-600 text-sm font-outfit">{description}</p>
        <button
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-outfit"
          onClick={onBookClick}
        >
          Book
        </button>
      </div>
    </div>
  )
}

export default RobotCard
