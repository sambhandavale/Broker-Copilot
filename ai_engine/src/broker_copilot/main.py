import sys
import json
import os
from src.broker_copilot.crew import BrokerCopilotCrew
from dotenv import load_dotenv

load_dotenv()

# Define Base Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DATA_FILE_PATH = os.path.join(BASE_DIR, 'data', 'client_data.json')
OUTPUT_DIR = os.path.join(BASE_DIR, 'output') # New output directory
OUTPUT_FILE_PATH = os.path.join(OUTPUT_DIR, 'renewal_report.json')

def load_data_from_file(filepath):
    if not os.path.exists(filepath):
        print(f"❌ Error: Data file not found at: {filepath}")
        sys.exit(1)

    with open(filepath, 'r') as f:
        try:
            data = json.load(f)
            return json.dumps(data)
        except json.JSONDecodeError as e:
            print(f"❌ Invalid JSON in file: {filepath}")
            print(f"Details: {e}")
            sys.exit(1)

def run():
    print(f"📂 Loading data from {DATA_FILE_PATH}...")
    raw_data_string = load_data_from_file(DATA_FILE_PATH)

    inputs = {'raw_data': raw_data_string}

    print("🚀 Starting Broker Copilot Analysis...")
    crew = BrokerCopilotCrew().crew()
    result = crew.kickoff(inputs=inputs)

    # --- SAVE TO FILE LOGIC ---
    print("\n💾 Saving results to file...")
    
    # 1. Create output directory if it doesn't exist
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # 2. Extract the JSON content safely
    final_content = ""
    try:
        if hasattr(result, 'pydantic') and result.pydantic:
            # If using structured output (Best quality)
            final_content = result.pydantic.model_dump_json(indent=2)
        elif hasattr(result, 'json_dict') and result.json_dict:
            # If parsed as a dictionary
            final_content = json.dumps(result.json_dict, indent=2)
        elif hasattr(result, 'raw'):
            # Fallback to raw string
            final_content = result.raw
        else:
            final_content = str(result)
            
        # 3. Write to file
        with open(OUTPUT_FILE_PATH, 'w') as f:
            f.write(final_content)
            
        print(f"✅ Success! Report saved at:\n   👉 {OUTPUT_FILE_PATH}")

    except Exception as e:
        print(f"⚠️ Error saving file: {e}")
        print("Raw output:", result)

def train():
    raw_data_string = load_data_from_file(DATA_FILE_PATH)
    inputs = {'raw_data': raw_data_string}

    try:
        BrokerCopilotCrew().crew().train(
            n_iterations=int(sys.argv[1]),
            filename='sys.pkl',
            inputs=inputs
        )
    except Exception as e:
        raise Exception(f"Training error: {e}")

def replay():
    try:
        BrokerCopilotCrew().crew().replay(task_id=sys.argv[1])
    except Exception as e:
        raise Exception(f"Replay error: {e}")

def test():
    raw_data_string = load_data_from_file(DATA_FILE_PATH)
    inputs = {'raw_data': raw_data_string}

    try:
        BrokerCopilotCrew().crew().test(
            n_iterations=int(sys.argv[1]),
            openai_model_name=sys.argv[2],
            inputs=inputs
        )
    except Exception as e:
        raise Exception(f"Test error: {e}")
    

if __name__ == "__main__":
    run()