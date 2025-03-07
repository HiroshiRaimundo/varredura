BOT_NAME = 'kogamonitoramento'

SPIDER_MODULES = ['kogamonitoramento.spiders']
NEWSPIDER_MODULE = 'kogamonitoramento.spiders'

# Configurações do banco de dados
DATABASE_URL = 'postgresql://user:password@localhost:5432/kogamonitoramento'

# Configurações do Scrapy
ROBOTSTXT_OBEY = True
CONCURRENT_REQUESTS_PER_DOMAIN = 16
DOWNLOAD_DELAY = 3

# Headers padrão
DEFAULT_REQUEST_HEADERS = {
   'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
   'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
}

# Enable or disable downloader middlewares
DOWNLOADER_MIDDLEWARES = {
   'kogamonitoramento.middlewares.KogamonitoramentoDownloaderMiddleware': 543,
}

# Pipeline para processamento dos dados
ITEM_PIPELINES = {
    'kogamonitoramento.pipelines.DataCleaningPipeline': 300,
    'kogamonitoramento.pipelines.PostgreSQLPipeline': 400,
}

# Configurações de cache do Scrapy
HTTPCACHE_ENABLED = True
HTTPCACHE_EXPIRATION_SECS = 0
HTTPCACHE_DIR = 'httpcache'
HTTPCACHE_IGNORE_HTTP_CODES = []
HTTPCACHE_STORAGE = 'scrapy.extensions.httpcache.FilesystemCacheStorage'

# Configurações adicionais
FEED_EXPORT_ENCODING = 'utf-8'
LOG_LEVEL = 'INFO'
LOG_FORMAT = '%(asctime)s [%(name)s] %(levelname)s: %(message)s'
COOKIES_ENABLED = False

# Tempo limite para requests
DOWNLOAD_TIMEOUT = 180

# Configurações de retry
RETRY_ENABLED = True
RETRY_TIMES = 3
RETRY_HTTP_CODES = [500, 502, 503, 504, 522, 524, 408, 429]

# Cache de requisições para evitar duplicatas
DUPEFILTER_CLASS = 'scrapy.dupefilters.RFPDupeFilter'
