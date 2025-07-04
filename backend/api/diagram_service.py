# diagram_service.py
import os
from .generate_diagram import generate_diagram

def generate_architecture_diagram(prompt: str, title: str = None) -> dict:
    """Generate diagram from user prompt and return result dictionary"""
    output_dir = os.path.join(os.getcwd(), 'temp_diagrams')
    os.makedirs(output_dir, exist_ok=True)
    return generate_diagram(prompt, title, output_dir)
