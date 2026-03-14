
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import sys, os
from pathlib import Path

sys.path.append(os.path.abspath("../"))

from agent.coding_agent import generate_code

app = FastAPI()

class ChatRequest(BaseModel):
    prompt: str

@app.post("/chat")
def chat(req: ChatRequest):
    result = generate_code(req.prompt)
    return {"response": result}

# Serve static files
static_dir = Path(__file__).parent / "static"
if static_dir.exists():
    app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")
else:
    # Fallback: if no static files, serve a simple HTML
    @app.get("/")
    def read_root():
        return {"message": "Frontend not built yet. Run 'npm run build' in the frontend folder."}

# For SPA routing - serve index.html for all unmatched routes
@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    index_file = static_dir / "index.html"
    if index_file.exists():
        return FileResponse(index_file)
    return {"error": "Frontend not found"}
