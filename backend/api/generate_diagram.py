import re
import os
from typing import Dict, List, Tuple, Optional
import uuid


class ArchitectureDiagramGenerator:
    def __init__(self, output_dir=None):
        """Initialize the diagram generator with component mappings."""
        # Set output directory - use provided dir or create diagrams folder in current directory
        if output_dir:
            self.output_dir = output_dir
        else:
            self.output_dir = os.path.join(os.getcwd(), 'temp_diagrams')
        
        # Create output directory if it doesn't exist
        os.makedirs(self.output_dir, exist_ok=True)
        
        self.setup_component_mappings()
    
    def setup_component_mappings(self):
        """Set up mappings for different technologies to diagram components across AWS, Azure, and GCP."""
        
        # Frontend technologies
        self.frontend_mapping = {
            'angular': 'diagrams.programming.framework.Angular',
            'angular.js': 'diagrams.programming.framework.Angular',
            'react': 'diagrams.programming.framework.React',
            'vue': 'diagrams.programming.framework.Vue',
            'frontend': 'diagrams.onprem.client.Client',
            'web': 'diagrams.onprem.client.Client',
            'ui': 'diagrams.onprem.client.Client'
        }
        
        # Backend technologies
        self.backend_mapping = {
            'spring': 'diagrams.programming.framework.Spring',
            'javaspring': 'diagrams.programming.framework.Spring',
            'java spring': 'diagrams.programming.framework.Spring',
            'node': 'diagrams.programming.language.Nodejs',
            'nodejs': 'diagrams.programming.language.Nodejs',
            'python': 'diagrams.programming.language.Python',
            'backend': 'diagrams.aws.compute.EC2',
            'api': 'diagrams.aws.compute.EC2'
        }
        
        # Database technologies (multi-cloud)
        self.database_mapping = {
            # Generic/AWS
            'postgresql': 'diagrams.aws.database.RDS',
            'postgres': 'diagrams.aws.database.RDS',
            'mysql': 'diagrams.aws.database.RDS',
            'mongodb': 'diagrams.aws.database.DocumentDB',
            'dynamodb': 'diagrams.aws.database.Dynamodb',
            'redis': 'diagrams.aws.database.ElastiCache',
            'database': 'diagrams.aws.database.RDS',
            # Azure specific
            'azure sql': 'diagrams.azure.database.SQLDatabases',
            'cosmosdb': 'diagrams.azure.database.CosmosDb',
            'cosmos db': 'diagrams.azure.database.CosmosDb',
            'azure cache': 'diagrams.azure.database.CacheForRedis',
            # GCP specific
            'cloud sql': 'diagrams.gcp.database.SQL',
            'firestore': 'diagrams.gcp.database.Firestore',
            'bigtable': 'diagrams.gcp.database.Bigtable',
            'memorystore': 'diagrams.gcp.database.Memorystore'
        }
        
        # AWS services
        self.aws_services = {
            'ec2': 'diagrams.aws.compute.EC2',
            'mylambda': 'diagrams.aws.compute.Lambda',
            'ecs': 'diagrams.aws.compute.ECS',
            'eks': 'diagrams.aws.compute.EKS',
            'fargate': 'diagrams.aws.compute.Fargate',
            's3': 'diagrams.aws.storage.S3',
            'cloudfront': 'diagrams.aws.network.CloudFront',
            'route53': 'diagrams.aws.network.Route53',
            'elb': 'diagrams.aws.network.ELB',
            'alb': 'diagrams.aws.network.ALB',
            'vpc': 'diagrams.aws.network.VPC',
            'api gateway': 'diagrams.aws.network.APIGateway',
            'apigateway': 'diagrams.aws.network.APIGateway',
            'gateway': 'diagrams.aws.network.APIGateway',
            'sqs': 'diagrams.aws.integration.SQS',
            'sns': 'diagrams.aws.integration.SNS',
            'eventbridge': 'diagrams.aws.integration.Eventbridge'
        }
        
        # Azure services
        self.azure_services = {
            'vm': 'diagrams.azure.compute.VM',
            'virtual machine': 'diagrams.azure.compute.VM',
            'azure vm': 'diagrams.azure.compute.VM',
            'app service': 'diagrams.azure.compute.AppServices',
            'function app': 'diagrams.azure.compute.FunctionApps',
            'azure functions': 'diagrams.azure.compute.FunctionApps',
            'aks': 'diagrams.azure.compute.KubernetesServices',
            'container instances': 'diagrams.azure.compute.ContainerInstances',
            'storage account': 'diagrams.azure.storage.StorageAccounts',
            'azure storage': 'diagrams.azure.storage.StorageAccounts',
            'blob storage': 'diagrams.azure.storage.BlobStorage',
            'cdn': 'diagrams.azure.network.CDNProfiles',
            'application gateway': 'diagrams.azure.network.ApplicationGateway',
            'load balancer': 'diagrams.azure.network.LoadBalancers',
            'vnet': 'diagrams.azure.network.VirtualNetworks',
            'virtual network': 'diagrams.azure.network.VirtualNetworks',
            'api management': 'diagrams.azure.integration.APIManagement',
            'service bus': 'diagrams.azure.integration.ServiceBus',
            'event grid': 'diagrams.azure.integration.IntegrationAccounts',
            'event hub': 'diagrams.azure.analytics.EventHubs',
            'logic apps': 'diagrams.azure.integration.LogicApps'
        }
        
        # GCP services
        self.gcp_services = {
            'compute engine': 'diagrams.gcp.compute.ComputeEngine',
            'gce': 'diagrams.gcp.compute.ComputeEngine',
            'cloud functions': 'diagrams.gcp.compute.Functions',
            'cloud run': 'diagrams.gcp.compute.Run',
            'gke': 'diagrams.gcp.compute.GKE',
            'kubernetes engine': 'diagrams.gcp.compute.GKE',
            'app engine': 'diagrams.gcp.compute.AppEngine',
            'cloud storage': 'diagrams.gcp.storage.Storage',
            'gcs': 'diagrams.gcp.storage.Storage',
            'cloud cdn': 'diagrams.gcp.network.CDN',
            'load balancing': 'diagrams.gcp.network.LoadBalancing',
            'vpc': 'diagrams.gcp.network.VPC',
            'api gateway': 'diagrams.oci.devops.APIGateway',
            'pub/sub': 'diagrams.gcp.analytics.PubSub',
            'pubsub': 'diagrams.gcp.analytics.PubSub',
            'cloud scheduler': 'diagrams.gcp.devtools.Scheduler',
            'cloud tasks': 'diagrams.gcp.compute.Functions'  # Using Functions as placeholder
        }
        
        # Security components (multi-cloud)
        self.security_mapping = {
            # AWS
            'iam': 'diagrams.aws.security.IAM',
            'waf': 'diagrams.aws.security.WAF',
            'shield': 'diagrams.aws.security.Shield',
            'cognito': 'diagrams.aws.security.Cognito',
            # Azure
            'azure ad': 'diagrams.azure.identity.ActiveDirectory',
            'active directory': 'diagrams.azure.identity.ActiveDirectory',
            'key vault': 'diagrams.azure.security.KeyVaults',
            'azure firewall': 'diagrams.azure.network.Firewall',
            # GCP
            'cloud iam': 'diagrams.gcp.security.IAM',
            'cloud armor': 'diagrams.gcp.security.Armor',
            'cloud kms': 'diagrams.gcp.security.KMS',
            # Generic
            'firewall': 'diagrams.aws.security.WAF',
            'identity': 'diagrams.aws.security.IAM'
        }
        
        # Monitoring and management (multi-cloud)
        self.monitoring_mapping = {
            # AWS
            'cloudwatch': 'diagrams.aws.management.Cloudwatch',
            'cloudtrail': 'diagrams.aws.management.Cloudtrail',
            # Azure
            'azure monitor': 'diagrams.azure.devops.Monitor',
            'application insights': 'diagrams.azure.devops.ApplicationInsights',
            'log analytics': 'diagrams.azure.analytics.LogAnalytics',
            # GCP
            'cloud monitoring': 'diagrams.gcp.operations.Monitoring',
            'cloud logging': 'diagrams.gcp.operations.Logging',
            'cloud trace': 'diagrams.gcp.operations.Trace',
            # Generic
            'monitoring': 'diagrams.aws.management.Cloudwatch',
            'logging': 'diagrams.aws.management.Cloudtrail'
        }
        
        # Container and orchestration (multi-cloud)
        self.container_mapping = {
            # Generic
            'docker': 'diagrams.onprem.container.Docker',
            'kubernetes': 'diagrams.k8s.compute.Pod',
            'k8s': 'diagrams.k8s.compute.Pod',
            # AWS
            'ecs': 'diagrams.aws.compute.ECS',
            'eks': 'diagrams.aws.compute.EKS',
            'fargate': 'diagrams.aws.compute.Fargate',
            # Azure
            'aks': 'diagrams.azure.compute.KubernetesServices',
            'container instances': 'diagrams.azure.compute.ContainerInstances',
            # GCP
            'gke': 'diagrams.gcp.compute.GKE',
            'cloud run': 'diagrams.gcp.compute.Run'
        }
        
        # Service discovery and messaging
        self.service_discovery = {
            # Generic
            'eureka': 'diagrams.aws.integration.SQS',
            'consul': 'diagrams.aws.integration.SQS',
            'service discovery': 'diagrams.aws.integration.SQS',
            'service exploration': 'diagrams.aws.integration.SQS',
            # AWS
            'sqs': 'diagrams.aws.integration.SQS',
            'sns': 'diagrams.aws.integration.SNS',
            # Azure
            'service bus': 'diagrams.azure.integration.ServiceBus',
            'event grid': 'diagrams.azure.integration.IntegrationAccounts',
            # GCP
            'pub/sub': 'diagrams.gcp.analytics.PubSub',
            'pubsub': 'diagrams.gcp.analytics.PubSub'
        }
        
        # User/Client
        self.client_mapping = {
            'user': 'diagrams.onprem.client.Users',
            'users': 'diagrams.onprem.client.Users',
            'client': 'diagrams.onprem.client.Client'
        }
        
        # DevOps and CI/CD (multi-cloud)
        self.devops_mapping = {
            # Generic
            'jenkins': 'diagrams.onprem.ci.Jenkins',
            'gitlab': 'diagrams.onprem.vcs.Gitlab',
            'github': 'diagrams.onprem.vcs.Github',
            # AWS
            'codebuild': 'diagrams.aws.devtools.Codebuild',
            'codepipeline': 'diagrams.aws.devtools.Codepipeline',
            'codecommit': 'diagrams.aws.devtools.Codecommit',
            # Azure
            'azure devops': 'diagrams.azure.devops.Devops',
            'azure pipelines': 'diagrams.azure.devops.Pipelines',
            'azure repos': 'diagrams.azure.devops.Repos',
            # GCP
            'cloud build': 'diagrams.gcp.devtools.Build',
            'cloud source repositories': 'diagrams.gcp.devtools.SourceRepositories'
        }

    def detect_cloud_provider(self, description: str) -> str:
        """
        Detect the primary cloud provider from the architecture description.
        
        Args:
            description (str): Architecture description
            
        Returns:
            str: Primary cloud provider ('aws', 'azure', 'gcp', or 'multi')
        """
        description_lower = description.lower()
        
        # Count cloud-specific mentions
        aws_count = 0
        azure_count = 0
        gcp_count = 0
        
        # AWS indicators
        aws_indicators = ['aws', 'amazon', 'ec2', 'lambda', 's3', 'cloudfront', 'route53', 'cognito', 'dynamodb']
        for indicator in aws_indicators:
            if indicator in description_lower:
                aws_count += description_lower.count(indicator)
        
        # Azure indicators
        azure_indicators = ['azure', 'microsoft', 'app service', 'function app', 'blob storage', 'cosmos', 'active directory']
        for indicator in azure_indicators:
            if indicator in description_lower:
                azure_count += description_lower.count(indicator)
        
        # GCP indicators
        gcp_indicators = ['gcp', 'google', 'compute engine', 'cloud run', 'app engine', 'firestore', 'pub/sub']
        for indicator in gcp_indicators:
            if indicator in description_lower:
                gcp_count += description_lower.count(indicator)
        
        # Determine primary cloud
        if aws_count > azure_count and aws_count > gcp_count:
            return 'aws'
        elif azure_count > aws_count and azure_count > gcp_count:
            return 'azure'
        elif gcp_count > aws_count and gcp_count > azure_count:
            return 'gcp'
        elif aws_count > 0 or azure_count > 0 or gcp_count > 0:
            # If there are multiple clouds mentioned, check for multi-cloud keywords
            if sum([aws_count > 0, azure_count > 0, gcp_count > 0]) > 1:
                return 'multi'
            # If only one cloud has mentions, return that
            if aws_count > 0:
                return 'aws'
            elif azure_count > 0:
                return 'azure'
            else:
                return 'gcp'
        else:
            return 'aws'  # Default to AWS if no specific cloud is detected

    def get_component_for_service(self, service_name, preferred_cloud=None):
        """
        Get the appropriate diagram component for a service.
        
        Args:
            service_name (str): Name of the service/technology
            preferred_cloud (str): Preferred cloud provider ('aws', 'azure', 'gcp')
        
        Returns:
            str: The diagram component import path
        """
        service_lower = service_name.lower()
        
        # Check all mapping dictionaries
        mappings = [
            self.frontend_mapping,
            self.backend_mapping,
            self.database_mapping,
            self.aws_services,
            self.azure_services,
            self.gcp_services,
            self.security_mapping,
            self.monitoring_mapping,
            self.container_mapping,
            self.service_discovery,
            self.client_mapping,
            self.devops_mapping
        ]
        
        # First try exact match
        for mapping in mappings:
            if service_lower in mapping:
                return mapping[service_lower]
        
        # If preferred cloud is specified, try cloud-specific mappings first
        if preferred_cloud:
            cloud_mappings = {
                'aws': self.aws_services,
                'azure': self.azure_services,
                'gcp': self.gcp_services
            }
            
            if preferred_cloud.lower() in cloud_mappings:
                cloud_mapping = cloud_mappings[preferred_cloud.lower()]
                if service_lower in cloud_mapping:
                    return cloud_mapping[service_lower]
        
        # Default fallback
        return 'diagrams.onprem.compute.Server'
    
    def parse_architecture_description(self, description: str) -> Dict:
        """Parse the architecture description and extract components."""
        description_lower = description.lower()
        
        components = {
            'frontend': [],
            'backend': [],
            'database': [],
            'aws_services': [],
            'azure_services': [],
            'gcp_services': [],
            'security': [],
            'monitoring': [],
            'service_discovery': [],
            'clients': [],
            'devops': [],
            'containers': [],
            'title': 'Architecture Diagram',
            'cloud_provider': self.detect_cloud_provider(description)
        }
        
        # Extract title from common patterns
        if 'system' in description_lower:
            title_match = re.search(r'(\w+\s*\w*)\s*system', description_lower)
            if title_match:
                components['title'] = title_match.group(1).title() + ' System Architecture'
        
        # Find components in each category
        for category, mapping in [
            ('frontend', self.frontend_mapping),
            ('backend', self.backend_mapping),
            ('database', self.database_mapping),
            ('aws_services', self.aws_services),
            ('azure_services', self.azure_services),
            ('gcp_services', self.gcp_services),
            ('security', self.security_mapping),
            ('monitoring', self.monitoring_mapping),
            ('service_discovery', self.service_discovery),
            ('clients', self.client_mapping),
            ('devops', self.devops_mapping),
            ('containers', self.container_mapping)
        ]:
            for keyword, component in mapping.items():
                if keyword in description_lower:
                    components[category].append({
                        'name': keyword.replace('_', ' ').title(),
                        'component': component,
                        'variable': keyword.replace(' ', '_').replace('.', '_').replace('/', '_')
                    })
        
        return components
    
    def generate_imports(self, components: Dict) -> List[str]:
        """Generate the necessary import statements."""
        imports = set()
        imports.add("from diagrams import Cluster, Diagram")
        
        # Collect all unique import paths
        for category in components.values():
            if isinstance(category, list):
                for comp in category:
                    if 'component' in comp:
                        module_path = '.'.join(comp['component'].split('.')[:-1])
                        class_name = comp['component'].split('.')[-1]
                        imports.add(f"from {module_path} import {class_name}")
        
        return sorted(list(imports))
    
    def get_cloud_cluster_name(self, cloud_provider: str) -> str:
        """Get the appropriate cluster name for the cloud provider."""
        cloud_names = {
            'aws': 'AWS Cloud',
            'azure': 'Azure Cloud',
            'gcp': 'Google Cloud',
            'multi': 'Multi-Cloud'
        }
        return cloud_names.get(cloud_provider, 'Cloud Infrastructure')
    
    def generate_diagram_code(self, architecture_description: str, custom_title: str = None) -> tuple:
        """Generate Python diagram code from architecture description and return code with filename."""
        
        # Parse the description
        components = self.parse_architecture_description(architecture_description)
        
        # Use custom title if provided
        if custom_title:
            components['title'] = custom_title
        
        # Generate unique filename
        unique_id = str(uuid.uuid4())[:8]
        base_filename = components['title'].lower().replace(' ', '_').replace('-', '_')
        # Remove special characters
        base_filename = re.sub(r'[^a-zA-Z0-9_]', '', base_filename)
        filename = f"{base_filename}_{unique_id}"
        
        # Full path for the diagram image
        image_path = os.path.join(self.output_dir, f"{filename}.png")
        
        # Generate imports
        imports = self.generate_imports(components)
        
        # Start building the code
        code_lines = []
        code_lines.append("from diagrams import Diagram")
        code_lines.append("from diagrams import Cluster")
        code_lines.extend(imports)
        code_lines.append("")
        code_lines.append("import os")
        code_lines.append("")
        
        # Set the diagram output path
        code_lines.append(f'output_path = r"{image_path}"')
        code_lines.append('filename_without_ext = os.path.splitext(output_path)[0]')
        code_lines.append("")
        code_lines.append(f'with Diagram("{components["title"]}", filename=filename_without_ext, show=False, direction="TB"):')

        # Create user/client components (outside cloud)
        if components['clients']:
            for client in components['clients']:
                class_name = client['component'].split('.')[-1]
                code_lines.append(f"    {client['variable']} = {class_name}(\"{client['name']}\")")
            code_lines.append("")
        
        # Determine cloud cluster name
        cloud_cluster_name = self.get_cloud_cluster_name(components['cloud_provider'])
        
        # Create Cloud cluster
        code_lines.append(f"    with Cluster(\"{cloud_cluster_name}\"):")
        
        # Security components
        if components['security']:
            code_lines.append("        # Security Components")
            for sec in components['security']:
                class_name = sec['component'].split('.')[-1]
                code_lines.append(f"        {sec['variable']} = {class_name}(\"{sec['name']}\")")
            code_lines.append("")
        
        # API Gateway / Load Balancer (check all cloud services)
        all_cloud_services = components['aws_services'] + components['azure_services'] + components['gcp_services']
        gateway_comp = None
        for comp in all_cloud_services:
            if any(term in comp['variable'].lower() for term in ['gateway', 'load_balancer', 'application_gateway']):
                gateway_comp = comp
                break
        
        if gateway_comp:
            class_name = gateway_comp['component'].split('.')[-1]
            code_lines.append(f"        {gateway_comp['variable']} = {class_name}(\"{gateway_comp['name']}\")")
            code_lines.append("")
        
        # Frontend cluster
        if components['frontend']:
            code_lines.append("        with Cluster(\"Frontend\"):")
            for frontend in components['frontend']:
                class_name = frontend['component'].split('.')[-1]
                code_lines.append(f"            {frontend['variable']} = {class_name}(\"{frontend['name']}\")")
            code_lines.append("")
        
        # Backend cluster
        if components['backend'] or any(all_cloud_services):
            code_lines.append("        with Cluster(\"Backend Services\"):")
            
            # Add backend frameworks
            for backend in components['backend']:
                class_name = backend['component'].split('.')[-1]
                code_lines.append(f"            {backend['variable']} = {class_name}(\"{backend['name']}\")")
            
            # Add cloud compute services (excluding gateways and databases)
            for service in all_cloud_services:
                if not any(term in service['variable'].lower() for term in ['gateway', 'database', 'storage', 'cdn', 'load_balancer']):
                    class_name = service['component'].split('.')[-1]
                    code_lines.append(f"            {service['variable']} = {class_name}(\"{service['name']}\")")
            
            # Add service discovery if present
            if components['service_discovery']:
                for service in components['service_discovery']:
                    class_name = service['component'].split('.')[-1]
                    code_lines.append(f"            {service['variable']} = {class_name}(\"{service['name']}\")")
            code_lines.append("")
        
        # Database cluster
        if components['database']:
            code_lines.append("        with Cluster(\"Database\"):")
            for db in components['database']:
                class_name = db['component'].split('.')[-1]
                code_lines.append(f"            {db['variable']} = {class_name}(\"{db['name']}\")")
            code_lines.append("")
        
        # Storage services
        storage_services = [s for s in all_cloud_services if 'storage' in s['variable'].lower()]
        if storage_services:
            code_lines.append("        # Storage Services")
            for storage in storage_services:
                class_name = storage['component'].split('.')[-1]
                code_lines.append(f"        {storage['variable']} = {class_name}(\"{storage['name']}\")")
            code_lines.append("")
        
        # Monitoring components
        if components['monitoring']:
            code_lines.append("        # Monitoring & Management")
            for monitor in components['monitoring']:
                class_name = monitor['component'].split('.')[-1]
                code_lines.append(f"        {monitor['variable']} = {class_name}(\"{monitor['name']}\")")
            code_lines.append("")
        
        # Generate connections
        code_lines.append("    # Connections")
        
        # Basic flow connections
        if components['clients']:
            client_var = components['clients'][0]['variable']
            
            # Connect to gateway if exists, otherwise to frontend
            if gateway_comp:
                code_lines.append(f"    {client_var} >> {gateway_comp['variable']}")
                
                if components['frontend']:
                    code_lines.append(f"    {gateway_comp['variable']} >> {components['frontend'][0]['variable']}")
            elif components['frontend']:
                code_lines.append(f"    {client_var} >> {components['frontend'][0]['variable']}")
        
        # Frontend to backend
        backend_services = components['backend'] + [s for s in all_cloud_services if not any(term in s['variable'].lower() for term in ['gateway', 'database', 'storage', 'cdn', 'load_balancer'])]
        if components['frontend'] and backend_services:
            code_lines.append(f"    {components['frontend'][0]['variable']} >> {backend_services[0]['variable']}")
        
        # Backend to database
        if backend_services and components['database']:
            code_lines.append(f"    {backend_services[0]['variable']} >> {components['database'][0]['variable']}")
        
        # Service discovery connections
        if components['service_discovery'] and backend_services:
            code_lines.append(f"    {backend_services[0]['variable']} >> {components['service_discovery'][0]['variable']}")

        return '\n'.join(code_lines), image_path
    
    def execute_diagram_code(self, code: str, image_path: str) -> str:
        """Execute the generated diagram code and return the image path."""
        try:
            # Execute the code in a controlled environment
            exec_globals = {}
            exec(code, exec_globals)
            
            # Check if the image file was created
            if os.path.exists(image_path):
                return image_path
            else:
                raise Exception(f"Diagram image was not created at expected path: {image_path}")
                
        except Exception as e:
            raise Exception(f"Error executing diagram code: {str(e)}")
    
    def generate_architecture_diagram(self, architecture_description: str, custom_title: str = None) -> dict:
        """
        Complete workflow to generate architecture diagram.
        
        Args:
            architecture_description: Description of the architecture
            custom_title: Custom title for the diagram (optional)
            
        Returns:
            dict: Contains 'success' status, 'image_path', 'message', and optional 'error'
        """
        try:
            # Generate the code and get the expected image path
            code, image_path = self.generate_diagram_code(architecture_description, custom_title)

            print("CODE:", code)
            
            # Execute the code to generate the diagram
            generated_image_path = self.execute_diagram_code(code, image_path)
            
            # Return the generated image path
            print("INTERNAL. GENERATED IMAGE PATH:", generated_image_path)
            return {
                'success': True,
                'image_path': generated_image_path,
                'code': code,
                'message': 'Architecture diagram generated successfully'
            }
            
        except Exception as e:
            return {
                'success': False,
                'image_path': None,
                'code':code,
                'message': 'Failed to generate architecture diagram',
                'error': str(e)
            }


def generate_diagram(architecture_description: str, custom_title: str = None, output_dir: str = None) -> dict:
    """
    Helper function to generate architecture diagrams.
    
    Args:
        architecture_description: Description of the architecture
        custom_title: Custom title for the diagram (optional)
        output_dir: Custom output directory (optional)
        
    Returns:
        dict: Contains result information including image path
    """
    generator = ArchitectureDiagramGenerator(output_dir=output_dir)
    return generator.generate_architecture_diagram(architecture_description, custom_title)


