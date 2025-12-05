from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
import json
import os
from src.broker_copilot.crew import BrokerCopilotCrew
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Input Schema
class AgentRequest(BaseModel):
    raw_data: str  # The merged JSON string from Next.js

@app.post("/analyze")
async def run_analysis(request: AgentRequest):
    try:
        print("🚀 Received analysis request...")
        
        # 1. Setup Inputs
        inputs = {'raw_data': request.raw_data}

        # 2. Run Crew
        crew = BrokerCopilotCrew().crew()
        result = crew.kickoff(inputs=inputs)

        # 3. Format Output
        output_data = {}
        if hasattr(result, 'pydantic') and result.pydantic:
            output_data = result.pydantic.model_dump()
        elif hasattr(result, 'json_dict') and result.json_dict:
            output_data = result.json_dict
        else:
            # Fallback parsing
            output_data = json.loads(str(result))

        return {"status": "success", "data": output_data}

    except Exception as e:
        print(f"❌ Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    # Run on port 8000
    uvicorn.run(app, host="0.0.0.0", port=8000)