import os
from dotenv import load_dotenv

load_dotenv()

# Database Configuration
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./bookings.db")

# Email Configuration
SMTP_USER = os.getenv("SMTP_USER", "cub.robokids@gmail.com")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "cub.robokids123")

# Secret Key for JWT Authentication
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

ROBOT_IP = "192.168.0.123"
ROBOT_PORT = 30002        
REALTIME_PORT = 30003     

# Logging
ENABLE_LOGGING = True
LOG_FILE = "robot_movement.log"
