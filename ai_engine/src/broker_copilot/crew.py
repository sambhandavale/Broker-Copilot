from crewai import Agent, Crew, Process, Task, LLM
from crewai.project import CrewBase, agent, crew, task
import os
from src.broker_copilot.models.renewal import DashboardOutput
from src.broker_copilot.models.emailDraft import FinalAgentOutput

@CrewBase
class BrokerCopilotCrew():
    """BrokerCopilot crew"""

    agents_config = 'config/agents.yaml'
    tasks_config = 'config/tasks.yaml'

    def get_llm(self):
        return LLM(
            model="gemini-2.0-flash",
            api_key=os.environ.get("GEMINI_API_KEY"),
            provider="google",
            temperature=0.5
        )

    # === AGENTS ===
    @agent
    def senior_renewal_strategist(self) -> Agent:
        return Agent(
            config=self.agents_config['senior_renewal_strategist'],
            verbose=True,
            llm=self.get_llm()
        )

    @agent
    def renewal_brief_specialist(self) -> Agent:
        return Agent(
            config=self.agents_config['renewal_brief_specialist'],
            verbose=True,
            llm=self.get_llm()
        )

    @agent
    def client_communication_specialist(self) -> Agent:
        return Agent(
            config=self.agents_config['client_communication_specialist'],
            verbose=True,
            llm=self.get_llm()
        )

    # === TASKS ===
    @task
    def scoring_task(self) -> Task:
        return Task(
            config=self.tasks_config['scoring_task'],
            output_pydantic=DashboardOutput
        )

    @task
    def brief_generation_task(self) -> Task:
        return Task(
            config=self.tasks_config['brief_generation_task'],
            # context=[self.scoring_task()],
        )

    @task
    def email_drafting_task(self) -> Task:
        return Task(
            config=self.tasks_config['email_drafting_task'],
            # context=[self.brief_generation_task(), self.scoring_task()],
            output_pydantic=FinalAgentOutput
        )

    # === CREWS ===

    @crew
    def scoring_crew(self) -> Crew:
        """
        ROUTE 1: BATCH ANALYSIS
        Runs ONLY the scoring task.
        Used for the dashboard view to rank all clients.
        """
        return Crew(
            agents=[self.senior_renewal_strategist()],
            tasks=[self.scoring_task()],
            process=Process.sequential,
            verbose=True,
            memory=False
        )

    @crew
    def content_crew_without_scoring(self) -> Crew:
        """
        ROUTE 2B: ON-DEMAND GENERATION (Skip Scoring)
        Takes pre-computed scoring data as input.
        Runs only Brief + Email generation.
        """
        return Crew(
            agents=[
                self.renewal_brief_specialist(),
                self.client_communication_specialist()
            ],
            tasks=[
                self.brief_generation_task(),
                self.email_drafting_task()
            ],
            process=Process.sequential,
            verbose=True,
            memory=False
        )
