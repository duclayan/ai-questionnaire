import os
from django.core.wsgi import get_wsgi_application

# Check if 'WEBSITE_HOSTNAME' is in os.environ or if a specific IP address is present
if 'WEBSITE_HOSTNAME' in os.environ or "169.254.131.9:8181" in os.environ:
    settings_module = 'crud.deployment'
else:
    settings_module = 'crud.settings'

os.environ.setdefault('DJANGO_SETTINGS_MODULE', settings_module)

application = get_wsgi_application()