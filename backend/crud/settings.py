from pathlib import Path
from dotenv import load_dotenv
from openai import AzureOpenAI
from datetime import timedelta

import os

# Load .env
load_dotenv()

# Azure OpenAI configuration
AZURE_OAI_ENDPOINT = os.getenv("AZURE_OAI_ENDPOINT")
AZURE_OAI_KEY = os.getenv("AZURE_OAI_KEY")
AZURE_OAI_DEPLOYMENT = os.getenv("AZURE_OAI_DEPLOYMENT")

# Initialize the Azure OpenAI client
AZURE_OAI_CLIENT = AzureOpenAI(
    api_key=AZURE_OAI_KEY,
    api_version="2024-02-15-preview",
    base_url=f"{AZURE_OAI_ENDPOINT}/openai/deployments/{AZURE_OAI_DEPLOYMENT}",
)

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-1@rqrs8dt_ptyd@2sn_y(-vpef0u0risop95j*_2p^y&)bt6iz"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ["localhost", "127.0.0.1"]


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "rest_framework",
    "rest_framework.authtoken",
    "corsheaders",
    "api",
    "rest_framework_simplejwt",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]


MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "crud.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "crud.wsgi.application"


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# Enable when setting up MSQL
# DATABASES = {
#     'default': {
#         'ENGINE': 'mssql',
#         'NAME': os.getenv("DB_NAME"),
#         'HOST': os.getenv("DB_SERVER"),
#         'PORT': '1433',
#         'USER': os.getenv("DB_USER"),
#         'PASSWORD': os.getenv("DB_PASSWORD"),
#         'OPTIONS': {
# 	            'driver': 'ODBC Driver 18 for SQL Server',
# 	        },
#     }
# }


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = "static/"

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# CORS RULES
REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
}
CORS_ORIGIN_ALLOW_ALL = True

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(seconds=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    # "ROTATE_REFRESH_TOKENS": False,
    # "BLACKLIST_AFTER_ROTATION": False,
    # "UPDATE_LAST_LOGIN": False,
    # "ALGORITHM": "HS256",
    # "SIGNING_KEY": settings.SECRET_KEY,
    # "VERIFYING_KEY": "",
    # "AUDIENCE": None,
    # "ISSUER": None,
    # "JSON_ENCODER": None,
    # "JWK_URL": None,
    # "LEEWAY": 0,
    # "AUTH_HEADER_TYPES": ("Bearer",),
    # "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    # "USER_ID_FIELD": "id",
    # "USER_ID_CLAIM": "user_id",
    # "USER_AUTHENTICATION_RULE": "rest_framework_simplejwt.authentication.default_user_authentication_rule",
    # "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    # "TOKEN_TYPE_CLAIM": "token_type",
    # "TOKEN_USER_CLASS": "rest_framework_simplejwt.models.TokenUser",
    # "JTI_CLAIM": "jti",
    # "SLIDING_TOKEN_REFRESH_EXP_CLAIM": "refresh_exp",
    # "SLIDING_TOKEN_LIFETIME": timedelta(minutes=5),
    # "SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=1),
    # "TOKEN_OBTAIN_SERIALIZER": "rest_framework_simplejwt.serializers.TokenObtainPairSerializer",
    # "TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSerializer",
    # "TOKEN_VERIFY_SERIALIZER": "rest_framework_simplejwt.serializers.TokenVerifySerializer",
    # "TOKEN_BLACKLIST_SERIALIZER": "rest_framework_simplejwt.serializers.TokenBlacklistSerializer",
    # "SLIDING_TOKEN_OBTAIN_SERIALIZER": "rest_framework_simplejwt.serializers.TokenObtainSlidingSerializer",
    # "SLIDING_TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSlidingSerializer",
}
# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:3000",  # Adjust this to your React app's URL
#     "http://studious-cod-46v7wqwvwx725j66-8000.app.github.dev",  # Add your deployed app URL if needed
# ]

# AZURE OPENAI

# Azure OpenAI settings
AZURE_OPENAI_API_KEY = os.getenv("AZURE_OPENAI_API_KEY")
AZURE_OPENAI_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT")
AZURE_OPENAI_DEPLOYMENT_ID = os.getenv("AZURE_OPENAI_DEPLOYMENT_ID")
