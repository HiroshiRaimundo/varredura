BOT_NAME = 'koga_monitor'

SPIDER_MODULES = ['koga_monitor.spiders']
NEWSPIDER_MODULE = 'koga_monitor.spiders'

# Configurações do Scrapy
ROBOTSTXT_OBEY = True
CONCURRENT_REQUESTS = 16
DOWNLOAD_DELAY = 1

# Headers padrão
DEFAULT_REQUEST_HEADERS = {
   'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
   'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
}

# Pipeline para salvar os dados
ITEM_PIPELINES = {
   'koga_monitor.pipelines.KogaMonitorPipeline': 300,
}
