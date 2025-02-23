from fastapi import APIRouter, File, UploadFile, HTTPException, Form
from app.services.robot_control import send_script_to_robot

router = APIRouter(prefix="/files", tags=["Files"])

@router.post("/upload")
async def upload_script(file: UploadFile = File(None), script: str = Form(None)):
    """Receives a file OR raw text script and sends it to the UR5e robot."""
    try:
        if file:
            script_content = await file.read()
            script_text = script_content.decode("utf-8") 
        elif script:
            script_text = script 
        else:
            raise HTTPException(status_code=400, detail="No script provided")

        response = send_script_to_robot(script_text)
        return {"message": "Script sent successfully", "robot_response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
