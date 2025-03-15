from fastapi import APIRouter, HTTPException
from app.services.robot_control import move_robot, move_robot_joints, get_robot_position

router = APIRouter(prefix="/robot", tags=["Robot"])

@router.post("/move")
def move_robot_endpoint(position: dict):
    """Receives a position from frontend and sends movement command to UR5e."""
    if not position:
        raise HTTPException(status_code=400, detail="Position data is required")

    return move_robot(position)

@router.post("/move-joints")
def move_robot_joints_endpoint(joint_positions: dict):
    """Receives joint positions from frontend and sends movement command to UR5e."""
    if not joint_positions:
        raise HTTPException(status_code=400, detail="Joint position data is required")

    return move_robot_joints(joint_positions)

@router.get("/position")
def robot_position():
    """Returns the current Cartesian position of the robot."""
    return get_robot_position()