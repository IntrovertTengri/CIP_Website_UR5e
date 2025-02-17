from fastapi import APIRouter
from app.services.robot_control import move_robot, get_robot_position

router = APIRouter()

@router.post("/move-robot/")
def move_robot_endpoint(position: dict):
    """Receives a position from frontend and sends movement command to UR5e."""
    return move_robot(position)

@router.get("/robot-position/")
def robot_position():
    """Returns the current Cartesian position of the robot."""
    return get_robot_position()
