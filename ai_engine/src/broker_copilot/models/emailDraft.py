from src.broker_copilot.models.renewalBrief import RenewalBrief
from pydantic import BaseModel, Field
from typing import List, Optional

class EmailDraft(BaseModel):
    """Output for the Communication Specialist"""
    template_used: str = Field(description="The tone/strategy used (e.g., 'Urgent Renewal', 'Relationship Check-in')")
    subject_line: str
    email_body: str
    is_editable: bool = True

class ClientPackage(BaseModel):
    """Combines the Brief and the Email into one package for the UI"""
    client_id: str
    client_name: str
    brief: RenewalBrief
    outreach_draft: EmailDraft

class FinalAgentOutput(BaseModel):
    """Final JSON structure returned to the Frontend by the Content Crew"""
    client_packages: List[ClientPackage]