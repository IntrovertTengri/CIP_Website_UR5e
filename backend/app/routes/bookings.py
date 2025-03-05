from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.database import get_db
from app.services.booking_service import create_booking

router = APIRouter()

class BookingRequest(BaseModel):
    user_id: int
    robot_name: str
    date: str
    time_slot: str

@router.post("/book-robot/")
def book_robot(request: BookingRequest, db: Session = Depends(get_db)):
    """Handles robot booking requests with JSON payload."""
    booking = create_booking(db, request.user_id, request.robot_name, request.date, request.time_slot)
    return {"message": "Booking successful", "booking_id": booking.id}
