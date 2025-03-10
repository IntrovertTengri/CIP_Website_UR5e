from sqlalchemy.orm import Session
from app.models import Booking, User
from datetime import datetime
import logging

logging.basicConfig(level=logging.DEBUG)

def create_booking(db: Session, user_id: int, robot_name: str, date: str, time_slot: str):
    try:
        date_obj = datetime.strptime(date, "%Y-%m-%d").date()

        logging.debug(f"Creating booking: user_id={user_id}, robot_name={robot_name}, date={date_obj}, time_slot={time_slot}")

        new_booking = Booking(user_id=user_id, robot_name=robot_name, date=date_obj, time_slot=time_slot)
        db.add(new_booking)
        db.commit()
        db.refresh(new_booking)

        from app.services.email_service import send_booking_email
        
        user = db.query(User).filter(User.id == user_id).first()
        if user:
            send_booking_email(user.email, robot_name, str(date_obj), time_slot)
            logging.debug(f"📧 Email sent to {user.email}")

        logging.debug(f"✅ Booking created successfully: {new_booking.id}")
        return new_booking

    except Exception as e:
        logging.error(f"❌ Error creating booking: {e}")
        db.rollback()
        raise e
