from passlib.context import CryptContext
from sqlalchemy.orm import Session
from app.models import User
from datetime import datetime, timedelta
from jose import JWTError, jwt
from config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_user(db: Session, username: str, email: str, school: str, password: str):
    hashed_password = hash_password(password)
    user = User(username=username, email=email, school=school, password_hash=hashed_password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def create_access_token(data: dict):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    data.update({"exp": expire})
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

def authenticate_user(db: Session, email: str, password: str):
    #Temporarily bypass authentication and return a test user.
    #return User(username="testuser", email="13akachan@gmail.com", school="CUB", password_hash="12345678")
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password_hash):
        return None
    return user
