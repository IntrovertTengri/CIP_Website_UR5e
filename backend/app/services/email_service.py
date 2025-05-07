import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config import SMTP_USER, SMTP_PASSWORD
import logging

logging.basicConfig(level=logging.DEBUG)

def send_booking_email(email: str, robot_name: str, date: str, time_slot: str):
    try:
        subject = "Robot Booking Confirmation"
        body = f"""
        Hello,

        Your booking for {robot_name} on {date} at {time_slot} is confirmed.
        
        Thank you,
        RoboKids Team
        """

        msg = MIMEMultipart()
        msg["From"] = SMTP_USER
        msg["To"] = email
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "plain"))

        with smtplib.SMTP_SSL("smtp.gmail.com", 587) as server:
            # server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(msg)
            # server.sendmail(SMTP_USER, email, msg.as_string())
        

        logging.debug(f"📧 Email sent to {email}")

    except Exception as e:
        logging.error(f"❌ Error sending email: {e}")
