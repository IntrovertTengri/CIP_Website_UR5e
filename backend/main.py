from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import robot, files, auth, bookings
from app.database import Base, engine

app = FastAPI(title="UR5e Robot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create Database Tables
Base.metadata.create_all(bind=engine)

# Register API routes
app.include_router(robot.router)
app.include_router(files.router)
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(bookings.router, tags=["Bookings"])

@app.get("/")
def home():
    return {"message": "UR5e Robot API is running"}
