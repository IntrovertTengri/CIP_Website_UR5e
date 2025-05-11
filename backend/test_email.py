from app.services.email_service import send_booking_email

# Replace with your actual test email address
test_email = "cpt.tychong@gmail.com"
robot_name = "RoboBuddy"
date = "2025-05-10"
time_slot = "14:00 - 15:00"

if __name__ == "__main__":
    print("🚀 Sending test email...")
    send_booking_email(test_email, robot_name, date, time_slot)
    print("✅ Done. Check your inbox.")
