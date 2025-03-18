import socket
import struct
import logging
from fastapi import HTTPException
from config import ROBOT_IP, ROBOT_PORT, REALTIME_PORT, ENABLE_LOGGING, LOG_FILE
from rtde_control import RTDEControlInterface
from rtde_receive import RTDEReceiveInterface   

if ENABLE_LOGGING:
    logging.basicConfig(filename=LOG_FILE, level=logging.INFO, format="%(asctime)s - %(message)s")

def get_robot_joints():
    rtde_r = RTDEReceiveInterface(ROBOT_IP)
    joint_positions = rtde_r.getActualQ()
    return {
        "J1": joint_positions[0],
        "J2": joint_positions[1],
        "J3": joint_positions[2],
        "J4": joint_positions[3],
        "J5": joint_positions[4],
        "J6": joint_positions[5]
    }

def move_robot(position: dict):
    """Sends a URScript command to move the UR5e to a specific position and logs it."""
    try:
        required_keys = {"J1", "J2", "J3", "J4", "J5", "J6"}
        if not required_keys.issubset(position.keys()):
            raise HTTPException(status_code=400, detail="Missing required position values")
        J1, J2, J3, J4, J5, J6 = position["J1"], position["J2"], position["J3"], position["J4"], position["J5"], position["J6"]
        script = f"""
        def main():
            movej([{J1},{J2},{J3},{J4},{J5},{J6}], a=0.2, v=0.2)
        end
        main()
        """
        print(script)

        with socket.create_connection((ROBOT_IP, ROBOT_PORT), timeout=5) as s:
            s.sendall(script.encode("utf-8"))

        if ENABLE_LOGGING:
            logging.info(f"Sent coordinates: J1={J1}, J2={J2}, J3={J3}, J4={J4}, J5={J5}, J6={J6}")

        return {"message": "Robot moved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to move robot: {str(e)}")
    
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
    