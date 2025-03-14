import scrapy
from datetime import datetime

class GovernoSpider(scrapy.Spider):
    name = 'governo'
    allowed_domains = ['gov.br']
    
    def __init__(self, *args, **kwargs):
        super(GovernoSpider, self).__init__(*args, **kwargs)
        self.start_urls = kwargs.get('start_urls', [
            'http://www.portaltransparencia.gov.br',
            'http://www.in.gov.br'
        ])

    def parse(self, response):
        # Extrai dados básicos
        yield {
            'url': response.url,
            'title': response.css('title::text').get(),
            'date': datetime.now().isoformat(),
            'content': response.css('main p::text').getall(),
            'metadata': {
                'source': 'governo',
                'type': 'portal',
                'headers': dict(response.headers)
            }
        }

        # Segue links internos
        for link in response.css('a[href^="http"]::attr(href)').getall():
            if any(domain in link for domain in self.allowed_domains):
                yield scrapy.Request(link, callback=self.parse)
