from flask_appbuilder.security.manager import AUTH_DB

# Configurações do Superset
ROW_LIMIT = 5000
SUPERSET_WEBSERVER_PORT = 8088

# Configuração do banco de dados do Superset
SQLALCHEMY_DATABASE_URI = 'postgresql://user:password@localhost:5432/kogamonitoramento'

# Configurações de cache
CACHE_CONFIG = {
    'CACHE_TYPE': 'redis',
    'CACHE_DEFAULT_TIMEOUT': 300,
    'CACHE_KEY_PREFIX': 'superset_',
    'CACHE_REDIS_HOST': 'localhost',
    'CACHE_REDIS_PORT': 6379,
    'CACHE_REDIS_DB': 1,
}

# Configurações de autenticação
AUTH_TYPE = AUTH_DB
SECRET_KEY = 'your-secret-key-here'

# Configurações de visualização
FEATURE_FLAGS = {
    'DASHBOARD_NATIVE_FILTERS': True,
    'DASHBOARD_CROSS_FILTERS': True,
    'DASHBOARD_NATIVE_FILTERS_SET': True,
    'ALERT_REPORTS': True,
    'DASHBOARD_CACHE': True,
    'DYNAMIC_PLUGINS': True,
    'SCHEDULED_QUERIES': True,
    'ENABLE_TEMPLATE_PROCESSING': True,
}

# Configurações de alerta
ALERT_REPORTS_NOTIFICATION_DRY_RUN = False
ENABLE_ALERTS = True

# Configurações de geolocalização
MAPBOX_API_KEY = 'your-mapbox-key-here'
