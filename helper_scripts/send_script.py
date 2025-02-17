from fastapi import FastAPI, File, UploadFile, HTTPException
import socket
import struct

app = FastAPI()

# UR5e Robot IP and Port
ROBOT_IP = "192.168.1.10"
ROBOT_PORT = 30002  
REALTIME_PORT = 30003  

def get_robot_position(ip_address: str, port: int = REALTIME_PORT):
    """Retrieves the Cartesian position of the robot's tool center point (TCP)."""
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.connect((ip_address, port))
            data = s.recv(1116)
            cartesian_position = struct.unpack('!6d', data[444:492])
            x, y, z = cartesian_position[:3]
            return [x, y, z]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get robot position: {str(e)}")

def send_to_robot(script: str):
    """Establishes a connection and sends the script to the UR5e robot."""
    try:
        with socket.create_connection((ROBOT_IP, ROBOT_PORT), timeout=5) as s:
            s.sendall(script.encode("utf-8"))
            return "URScript sent successfully."
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send script: {str(e)}")

@app.post("/upload-script/")
async def upload_script(file: UploadFile = File(...)):
    """Endpoint to receive and send a script to the UR5e robot."""
    try:
        script_content = await file.read()
        script_text = script_content.decode("utf-8")
        response = send_to_robot(script_text)
        return {"message": "Script sent successfully", "robot_response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/robot-position/")
def robot_position():
    """Endpoint to retrieve the robot's current Cartesian position."""
    try:
        position = get_robot_position(ROBOT_IP)
        return {"x": position[0], "y": position[1], "z": position[2]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
