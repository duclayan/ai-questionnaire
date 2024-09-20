import graphviz

# Create a new directed graph with orthogonal edges and horizontal layout
dot = graphviz.Digraph(comment='C4 Style Architecture Diagram', graph_attr={'splines': 'ortho', 'rankdir': 'LR'})

# Define subgraphs to group components (like Client, Server, Database, and External API)
with dot.subgraph(name='cluster_client') as client:
    client.attr(label="Client", style="filled", color="lightgrey")
    client.node('ReactJS', 'ReactJS Frontend', shape='rect', margin='0.2')

with dot.subgraph(name='cluster_backend') as backend:
    backend.attr(label="Backend", style="filled", color="lightgrey")
    backend.node('Django', 'Django Backend', shape='rect', margin='0.2')

with dot.subgraph(name='cluster_cloud') as cloud:
    cloud.attr(label="Server", style="filled", color="lightgrey")
    cloud.node('AzureWebApp', 'Azure Web App Services', shape='rect', margin='0.2')
    cloud.node('OpenAI', 'OpenAI API', shape='rect', margin='0.2')
    cloud.node('SQLDatabase', 'Azure SQL Database', shape='rect', margin='0.2')

dot.node('User', 'User', shape='plaintext')
# with dot.subgraph(name='cluster_database') as database:
#     database.attr(label="Database", style="filled", color="lightgrey")
#     database.node('SQLDatabase', 'Azure SQL Database', shape='rect', margin='0.2')

# with dot.subgraph(name='cluster_external_api') as external_api:
#     external_api.attr(label="External API", style="filled", color="lightgrey")
#     external_api.node('OpenAI', 'OpenAI API', shape='rect', margin='0.2')

# Add edges to represent interactions between components
dot.edge('User', 'ReactJS', label='Interacts with')
dot.edge('ReactJS', 'Django', label='HTTP Requests')
dot.edge('Django', 'SQLDatabase', label='Data Queries')
dot.edge('Django', 'OpenAI', label='API Calls')
dot.edge('Django', 'AzureWebApp', label='Hosted on')

# Render the graph to a file and view it
output_file = dot.render('architecture_diagram.png', format='png', cleanup=True)
print(f"Graph rendered and saved as: {output_file}")
