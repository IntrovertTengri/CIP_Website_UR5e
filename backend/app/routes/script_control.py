from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.robot_control import send_script_to_robot

router = APIRouter(prefix="/scripts", tags=["Scripts"])

class ScriptRequest(BaseModel):
    script: str

@router.post("/send/")
async def send_script(script_request: ScriptRequest):
    """Receives a script text and sends it to the UR5e robot."""
    script_text = script_request.script.strip()
    
    if not script_text:
        raise HTTPException(status_code=400, detail="Script text is required")

    success = send_script_to_robot(script_text)  # Function to send script to the robot
    if not success:
        raise HTTPException(status_code=500, detail="Failed to send script to robot")

    return {"message": "Script sent successfully!"}
