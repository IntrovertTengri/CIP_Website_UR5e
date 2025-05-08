# email_utils.py
import smtplib
import logging
from email.message import EmailMessage
from config import SMTP_USER, SMTP_PASSWORD

logging.basicConfig(level=logging.DEBUG)

def send_booking_email(email: str, robot_name: str, date: str, time_slot: str):
    try:
        subject = " Robot Booking Confirmation"
        body = f"""
        Hello,

        Your booking for {robot_name} on {date} at {time_slot} is confirmed.

        Thank you,
        RoboKids Team
        """

        msg = EmailMessage()
        msg["From"] = SMTP_USER
        msg["To"] = email
        msg["Subject"] = subject
        msg.set_content(body)

        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(msg)

        logging.debug(f"Email sent successfully to {email}")

    except Exception as e:
        logging.exception(f"Failed to send email to {email}: {e}")
