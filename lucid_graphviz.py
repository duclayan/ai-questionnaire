import graphviz

def create_c4_architecture_diagram(output_filename="c4_architecture_diagram"):
    # Create a new Graphviz Digraph object
    dot = graphviz.Digraph(comment="C4 Architecture Diagram")

    # Set global graph properties
    dot.attr(rankdir="TB", splines="ortho", nodesep="1.0", ranksep="1.0")

    # Frontend
    with dot.subgraph(name="cluster_frontend") as frontend:
        frontend.attr(label="Frontend", style="filled", color="lightblue")
        frontend.node("ReactJS", label="ReactJS", shape="box", style="filled", color="lightgray")

    # Backend
    with dot.subgraph(name="cluster_backend") as backend:
        backend.attr(label="Backend", style="filled", color="lightcoral")
        backend.node("Django", label="Django Python", shape="box", style="filled", color="lightgray")
        backend.node("SQL", label="SQL Database", shape="box", style="filled", color="lightgray")
        backend.node("OpenAI", label="OpenAI API", shape="box", style="filled", color="lightgray")

    # Cloud
    with dot.subgraph(name="cluster_cloud") as cloud:
        cloud.attr(label="Cloud", style="filled", color="lightgreen")
        cloud.node("Azure", label="Azure Web App Services", shape="box", style="filled", color="lightgray")

    # Define relationships between components
    dot.edge("ReactJS", "Azure", label="Deployment")
    dot.edge("Azure", "Django", label="Routes Traffic")
    dot.edge("Django", "SQL", label="Data Access")
    dot.edge("Django", "OpenAI", label="AI Integration")

    # Save as PNG
    dot.format = "png"
    output_path = dot.render(output_filename)
    
    print(f"Diagram saved as {output_path}")

if __name__ == "__main__":
    create_c4_architecture_diagram()
