import socket
import struct
from fastapi import HTTPException
from config import ROBOT_IP, ROBOT_PORT, REALTIME_PORT
import logging

# Set up logging
logging.basicConfig(filename="robot_movement.log", level=logging.INFO, format="%(asctime)s - %(message)s")

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

def move_robot(position):
    """Sends a URScript command to move the UR5e to a specific position and logs it."""
    try:
        x, y, z, rx, ry, rz = position["x"], position["y"], position["z"], position["rx"], position["ry"], position["rz"]
        script = f"movel(p[{x},{y},{z},{rx},{ry},{rz}], a=0.2, v=0.2)\n"
        
        with socket.create_connection((ROBOT_IP, ROBOT_PORT), timeout=5) as s:
            s.sendall(script.encode("utf-8"))

        # Log movement to file
        logging.info(f"Sent coordinates: X={x}, Y={y}, Z={z}, Rx={rx}, Ry={ry}, Rz={rz}")

        return {"message": "Robot moved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to move robot: {str(e)}")
    
def send_script_to_robot(script):
    """Sends a custom URScript to the UR5e robot."""
    try:
        with socket.create_connection((ROBOT_IP, ROBOT_PORT), timeout=5) as s:
            s.sendall(script.encode("utf-8"))
        return "URScript sent successfully."
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send script: {str(e)}")

