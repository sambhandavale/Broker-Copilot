from crewai import Agent, Crew, Process, Task, LLM
from crewai.project import CrewBase, agent, crew, task
from src.broker_copilot.models import DashboardOutput
import os

@CrewBase
class BrokerCopilotCrew():
    """BrokerCopilot crew"""

    agents_config = 'config/agents.yaml'
    tasks_config = 'config/tasks.yaml'

    @agent
    def senior_renewal_strategist(self) -> Agent:
        # ✅ CrewAI-native LLM wrapper (works!)
        gemini_llm = LLM(
            model="gemini-2.0-flash",
            api_key=os.environ.get("GEMINI_API_KEY"),
            provider="google",
            temperature=0.5
        )

        return Agent(
            config=self.agents_config['senior_renewal_strategist'],
            verbose=True,
            llm=gemini_llm
        )

    @task
    def scoring_task(self) -> Task:
        return Task(
            config=self.tasks_config['scoring_task'],
            output_json=DashboardOutput
        )

    @crew
    def crew(self) -> Crew:
        return Crew(
            agents=self.agents, 
            tasks=self.tasks, 
            process=Process.sequential,
            verbose=True,
            memory=False
        )
