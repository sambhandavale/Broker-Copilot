from pydantic import BaseModel, Field, field_validator # 👈 Added field_validator
from typing import List, Optional, Any # 👈 Added Any
from datetime import datetime

class FinancialSnapshot(BaseModel):
    total_annual_premium: float
    primary_carrier: str
    days_to_expiry: int
    renewal_urgency: str = Field(description="Low, Medium, or High")

class Signal(BaseModel):
    signal_type: str = Field(description="e.g., Sentiment, Engagement, Policy Status")
    description: str
    source_system: str
    source_reference: str = Field(description="The ID, e.g., E006 or POL-123")
    # ✅ This line is already correct in your snippet, keep it:
    source_link: Optional[str] = Field(None, description="URL if applicable, otherwise null")
    impact: str = Field(description="Positive, Negative, or Neutral")

class ActionItem(BaseModel):
    step: int
    action: str
    detail: str
    tool_link: Optional[str] = Field(None, description="Link to Calendar, Email, etc.")

class ActionPlan(BaseModel):
    suggested_actions: List[ActionItem]

class CoverageGapAnalysis(BaseModel):
    current_coverage: List[str]
    identified_gaps: List[str]
    upsell_talking_point: str

# --- Main Brief Model ---

class RenewalBrief(BaseModel):
    client_id: str
    client_name: str
    brief_generated_at: str = Field(default_factory=lambda: datetime.now().isoformat())
    
    executive_summary: str = Field(description="3-sentence overview of health and sentiment.")
    financial_snapshot: FinancialSnapshot 
    
    key_signals: List[Signal]

    @field_validator('key_signals', mode='before')
    @classmethod
    def parse_key_signals(cls, v: Any) -> Any:
        if isinstance(v, dict):
            if "items" in v:
                return v["items"]
            if "signals" in v:
                return v["signals"]
            return next(iter(v.values()), [])
        return v
    
    coverage_gap_analysis: CoverageGapAnalysis 
    action_plan: ActionPlan