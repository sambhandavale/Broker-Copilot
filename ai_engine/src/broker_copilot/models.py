from pydantic import BaseModel, Field
from typing import List, Optional

class Reference(BaseModel):
    source_id: str = Field(..., description="The ID of the policy or email (e.g., 'E001' or 'POL-123')")
    snippet: str = Field(..., description="The specific text snippet used for evidence")
    url: str = Field(..., description="The direct URL to the source (Outlook link or Dashboard link)")

class RenewalCard(BaseModel):
    # CRITICAL: This ensures we can link the AI result back to the correct client in your DB
    record_id: str = Field(..., description="The EXACT 'id' string provided in the input JSON. Do not change or generate a new one.")
    
    rank: int = Field(..., description="The priority rank (1 being highest)")
    client_name: str = Field(..., description="Name of the client")
    total_premium: int = Field(..., description="Total value of all policies")
    
    # --- Scoring ---
    score: int = Field(..., description="Calculated priority score out of 100")
    status: str = Field(..., description="Critical, High, Medium, or Low")

    # --- NEW FIELD: Narrative Context ---
    reasoning: str = Field(..., description="A 2-sentence executive summary explaining the score. (e.g., 'Score is high due to imminent expiry and a pending claim, despite the client's high value.')")
    
    # --- Rich Analysis ---
    risk_factors: List[str] = Field(..., description="List of 2-3 negative factors driving the score (e.g., 'Recent Claim', 'Angry Email')")
    positive_factors: List[str] = Field(..., description="List of positive factors (e.g., 'Long-term client', 'Growth')")
    
    # --- Copilot Actionability ---
    talking_points: List[str] = Field(..., description="3 concise, conversational bullet points the broker can use in a call")
    upsell_opportunity: Optional[str] = Field(None, description="A specific missing coverage to suggest (e.g., 'Client has Fleet but no Cyber coverage')")
    
    recommended_action: str = Field(..., description="Next step for the account manager")
    key_references: List[Reference] = Field(..., description="Evidence backing the score")

class DashboardOutput(BaseModel):
    renewals: List[RenewalCard]