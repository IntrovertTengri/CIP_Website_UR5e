import socket
import struct
import logging
from fastapi import HTTPException
from config import ROBOT_IP, ROBOT_PORT, REALTIME_PORT, ENABLE_LOGGING, LOG_FILE

if ENABLE_LOGGING:
    logging.basicConfig(filename=LOG_FILE, level=logging.INFO, format="%(asctime)s - %(message)s")

def get_robot_position():
    """Retrieves the Cartesian position of the UR5e robot's TCP."""
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.connect((ROBOT_IP, REALTIME_PORT))
            data = s.recv(1116)
            cartesian_position = struct.unpack('!6d', data[444:492])
            return {"x": cartesian_position[0], "y": cartesian_position[1], "z": cartesian_position[2]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get robot position: {str(e)}")

def move_robot(position: dict):
    """Sends a URScript command to move the UR5e to a specific position and logs it."""
    try:
        required_keys = {"J1", "J2", "J3", "J4", "J5", "J6"}
        if not required_keys.issubset(position.keys()):
            raise HTTPException(status_code=400, detail="Missing required position values")

        J1, J2, J3, J4, J5, J6 = position["x"], position["y"], position["z"], position["rx"], position["ry"], position["rz"]
        script = f"movel(p[{J1},{J2},{J3},{J4},{J5},{J6}], a=0.2, v=0.2)\n"

        with socket.create_connection((ROBOT_IP, ROBOT_PORT), timeout=5) as s:
            s.sendall(script.encode("utf-8"))

        if ENABLE_LOGGING:
            logging.info(f"Sent coordinates: J1={J1}, J2={J2}, J3={J3}, J4={J4}, J5={J5}, J6={J6}")

        return {"message": "Robot moved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to move robot: {str(e)}")

def move_robot_joints(joint_positions: dict):
    """Sends a URScript command to move the UR5e joints to specific angles."""
    try:
        required_keys = {"J1", "J2", "J3", "J4", "J5", "J6"}
        if not required_keys.issubset(joint_positions.keys()):
            raise HTTPException(status_code=400, detail="Missing required joint values")

        # Create URScript for joint movement
        script = f"""
        def move_joints():
            movej([{joint_positions['J1']}, {joint_positions['J2']}, {joint_positions['J3']}, 
                  {joint_positions['J4']}, {joint_positions['J5']}, {joint_positions['J6']}], 
                  a=0.2, v=0.2)
        end
        move_joints()
        """

        with socket.create_connection((ROBOT_IP, ROBOT_PORT), timeout=5) as s:
            s.sendall(script.encode("utf-8"))

        if ENABLE_LOGGING:
            logging.info(f"Moved joints to: J1={joint_positions['J1']}, J2={joint_positions['J2']}, J3={joint_positions['J3']}, J4={joint_positions['J4']}, J5={joint_positions['J5']}, J6={joint_positions['J6']}")

        return {"message": "Robot joints moved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to move robot joints: {str(e)}")
    
def send_script_to_robot(script: str):
    """Sends a custom URScript to the UR5e robot."""
    try:
        with socket.create_connection((ROBOT_IP, ROBOT_PORT), timeout=5) as s:
            s.sendall(script.encode("utf-8"))

        if ENABLE_LOGGING:
            logging.info(f"Sent script:\n{script}")

        return "URScript sent successfully."
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send script: {str(e)}")