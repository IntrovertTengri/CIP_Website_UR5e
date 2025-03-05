from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.services.auth_service import create_user

# Create a database session
db: Session = SessionLocal()

# User details
username = "13akachan"
email = "13akachan@gmail.com"
school = "CUB"
password = "12345678"

# Create the user
user = create_user(db, username, email, school, password)

print(f"User added: {user.email} (ID: {user.id})")
db.close()
