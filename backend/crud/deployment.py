import os 
from .settings import *
from .settings import BASE_DIR
from datetime import timedelta

# SECRET_KEY = os.environ['SECRET_KEY']
SECRET_KEY = "5HihHVOFCc"

allowed_hosts = [
    os.environ.get('WEBSITE_HOSTNAME'),
    "169.254.131.9",
    'cyberai.sbs',
    'admx.cyberai.sbs',
    'userx.cyberai.sbs'
]

# Filter out None values and set ALLOWED_HOSTS accordingly
ALLOWED_HOSTS = [host for host in allowed_hosts if host] if any(host for host in allowed_hosts) else ["localhost", "127.0.0.1"]

# Configure CSRF trusted origins
CSRF_TRUSTED_ORIGINS = ['https://admx.cyberai.sbs', 'https://userx.cyberai.sbs']

if 'WEBSITE_HOSTNAME' in os.environ:
    CSRF_TRUSTED_ORIGINS.append('https://' + os.environ['WEBSITE_HOSTNAME'])

DEBUG = True

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

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "rest_framework",
    "rest_framework.authtoken",
    "rest_framework_simplejwt",
    "corsheaders",
    "api",
    "captcha",
    "whitenoise",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=7),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
    'SLIDING_TOKEN_LIFETIME': timedelta(days=30),
    'SLIDING_TOKEN_REFRESH_LIFETIME_LATE_USER': timedelta(days=1),
    'SLIDING_TOKEN_LIFETIME_LATE_USER': timedelta(days=30),
}

# CORS_ALLOWED_ORIGINS = [
#     "https://dduclayan-frontend-egacbucchbcgfhd8.eastus-01.azurewebsites.net",
#     Microsoft
# ]
CORS_ALLOW_ALL_ORIGINS = True
# CORS_ORIGIN_ALLOW_ALL = True
STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedStaticFilesStorage",
    },
}

SESSION_ENGINE = "django.contrib.sessions.backends.cache"
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
AZURE_OPENAI_API_KEY = os.getenv('AZURE_OPENAI_API_KEY')
AZURE_OPENAI_ENDPOINT = os.getenv('AZURE_OPENAI_ENDPOINT')
AZURE_OPENAI_DEPLOYMENT = os.getenv('AZURE_OPENAI_DEPLOYMENT')
# O1 Mini Implementation of AzureOpenAI
O1MINI_AZURE_OPENAI_API_KEY = os.getenv('O1MINI_AZURE_OPENAI_API_KEY')
O1MINI_AZURE_OPENAI_ENDPOINT = os.getenv('O1MINI_AZURE_OPENAI_ENDPOINT')
O1MINI_AZURE_OPENAI_DEPLOYMENT = os.getenv('O1MINI_AZURE_OPENAI_DEPLOYMENT')

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

print("***** THIS IS THE DATABASE", DATABASES)
