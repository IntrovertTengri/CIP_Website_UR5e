from fastapi import APIRouter, HTTPException
from app.services.robot_control import move_robot, get_robot_position

router = APIRouter(prefix="/robot", tags=["Robot"])

@router.post("/move")
def move_robot_endpoint(position: dict):
    """Receives a position from frontend and sends movement command to UR5e."""
    if not position:
        raise HTTPException(status_code=400, detail="Position data is required")

    return move_robot(position)

@router.get("/position")
def robot_position():
    """Returns the current Cartesian position of the robot."""
    return get_robot_position()
