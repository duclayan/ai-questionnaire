import os 
from .settings import *
from .settings import BASE_DIR


SECRET_KEY = os.environ['SECRET']
ALLOWED_HOSTS = [os.environ['WEBSITE_HOSTNAME']]
CSRF_TRUSTED_ORIGINS = ['https://' + os.environ['WEBSITE_HOSTNAME']]
DEBUG = False

# WhiteNoise configuration
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
AZURE_OPENAI_API_KEY = os.getenv('AZURE_OPENAI_API_KEY')
AZURE_OPENAI_ENDPOINT = os.getenv('AZURE_OPENAI_ENDPOINT')
AZURE_OPENAI_DEPLOYMENT = os.getenv('AZURE_OPENAI_DEPLOYMENT')
# AZURE_OPENAI_ENDPOINT= "https://xijinopenai.openai.azure.com"
# AZURE_OPENAI_API_KEY = "9570364630d04e8ebe2489e85d3d86be"
# AZURE_OPENAI_DEPLOYMENT ="xijingpt-4o"

if AZURE_OPENAI_API_KEY is None or AZURE_OPENAI_ENDPOINT is None:
    raise ValueError("AZURE_OPENAI_API_KEY and AZURE_OPENAI_ENDPOINT environment variables must be set.")

# Get the connection string from environment variables
conn_str = os.environ['AZURE_POSTGRESQL_CONNECTIONSTRING']

# Initialize an empty dictionary to hold the connection string parameters
conn_str_params = {}

# Split the connection string into pairs and process each one
for pair in conn_str.split(' '):
    if '=' in pair:
        key, value = pair.split('=', 1)  # Split on the first '=' only
        conn_str_params[key] = value
    else:
        print(f"Warning: Skipping malformed pair: {pair}")

# Define the DATABASES dictionary for Django
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': conn_str_params.get('dbname'),
        'HOST': conn_str_params.get('host'),
        'USER': conn_str_params.get('user'),
        'PASSWORD': conn_str_params.get('password'),
    }
}
