import scrapy
from datetime import datetime
from ..items import MonitoringItem
from ..analyzers.content_analyzer import ContentAnalyzer
import json

class GovernoSpider(scrapy.Spider):
    name = 'governo'
    analyzer = ContentAnalyzer()
    
    def __init__(self, *args, **kwargs):
        super(GovernoSpider, self).__init__(*args, **kwargs)
        self.start_urls = kwargs.get('start_urls', [
            'http://www.portaltransparencia.gov.br',
            'http://www.in.gov.br'
        ])
        self.monitoring_id = kwargs.get('monitoring_id')
        self.data_points = []
        self.allowed_domains = ['gov.br']

    def parse(self, response):
        # Extrai todos os links da página
        links = response.css('a::attr(href)').getall()
        
        # Análise de rede
        network_analysis = self.analyzer.analyze_network(response.url, links)
        
        # Extrai o conteúdo textual
        text_content = ' '.join(response.css('p::text').getall())
        
        # Análise de conteúdo
        content_analysis = self.analyzer.analyze_text(text_content)
        
        # Armazena o ponto de dados para análise de anomalias
        data_point = {
            'url': response.url,
            'timestamp': datetime.now().isoformat(),
            'content': text_content,
            'network_metrics': network_analysis,
            'content_metrics': content_analysis
        }
        self.data_points.append(data_point)
        
        # Detecta anomalias se houver dados suficientes
        anomaly_detection = self.analyzer.detect_anomalies(self.data_points)
        
        # Gera relatório com insights
        report = self.analyzer.generate_report({
            'network_analysis': network_analysis,
            'content_analysis': content_analysis,
            'anomaly_detection': anomaly_detection
        })
        
        # Cria o item de monitoramento
        monitoring_item = MonitoringItem()
        monitoring_item['monitoring_id'] = self.monitoring_id
        monitoring_item['url'] = response.url
        monitoring_item['timestamp'] = datetime.now().isoformat()
        monitoring_item['content_hash'] = response.text
        monitoring_item['analysis'] = {
            'network': network_analysis,
            'content': content_analysis,
            'anomalies': anomaly_detection,
            'report': report
        }
        
        yield monitoring_item
        
        # Segue os links encontrados
        for link in links:
            if link.startswith('/'):
                link = response.urljoin(link)
            if any(domain in link for domain in self.allowed_domains):
                yield scrapy.Request(link, callback=self.parse)
