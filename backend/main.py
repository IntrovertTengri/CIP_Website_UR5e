from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import robot, files

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any frontend (for testing)
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

app.include_router(robot.router)
app.include_router(files.router) 

@app.get("/")
def home():
    return {"message": "UR5e Robot API is running"}
