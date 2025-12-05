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
    raw_data: str  # JSON string

@app.post("/analyze")
async def run_batch_scoring(request: AgentRequest):
    """
    Step 1: Dashboard Load
    Takes a list of clients, scores them, and returns the ranked list.
    Does NOT generate briefs or emails yet.
    """
    try:
        print("🚀 Received Batch Scoring Request...")
        
        inputs = {'raw_data': request.raw_data}

        # Use the scoring_crew (Task 1 Only)
        crew = BrokerCopilotCrew().scoring_crew()
        result = crew.kickoff(inputs=inputs)

        # Format Output
        output_data = {}
        if hasattr(result, 'pydantic') and result.pydantic:
            output_data = result.pydantic.model_dump()
        elif hasattr(result, 'json_dict') and result.json_dict:
            output_data = result.json_dict
        else:
            output_data = json.loads(str(result))

        return {"status": "success", "data": output_data}

    except Exception as e:
        print(f"❌ Error in batch scoring: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/generate_detail")
async def run_detail_generation(request: AgentRequest):
    """
    Step 2: On-Demand Generation (Skip Scoring)
    Takes precomputed scoring data (from senior_renewal_strategist output)
    and generates the Brief + Email Draft.
    """
    try:
        print("🚀 Received Single Client Generation Request (Brief -> Email)...")

        # Expect precomputed score as JSON
        inputs = {'scoring_data': request.raw_data}

        # Use the new crew that skips scoring
        crew = BrokerCopilotCrew().content_crew_without_scoring()
        result = crew.kickoff(inputs=inputs)

        # Normalize result
        output_data = {}
        if hasattr(result, 'pydantic') and result.pydantic:
            output_data = result.pydantic.model_dump()
        elif hasattr(result, 'json_dict') and result.json_dict:
            output_data = result.json_dict
        else:
            output_data = json.loads(str(result))

        return {"status": "success", "data": output_data}

    except Exception as e:
        print(f"❌ Error in detail generation: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)