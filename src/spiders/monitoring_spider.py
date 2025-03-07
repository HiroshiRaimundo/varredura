import scrapy
from datetime import datetime
from sqlalchemy.orm import Session
from ..models import Website, Metric, ContentAnalysis, NetworkMetric
from textblob import TextBlob
import hashlib
import json
import time

class MonitoringSpider(scrapy.Spider):
    name = 'monitoring'
    
    def __init__(self, session: Session, *args, **kwargs):
        super(MonitoringSpider, self).__init__(*args, **kwargs)
        self.session = session
        
    def start_requests(self):
        websites = self.session.query(Website).all()
        for website in websites:
            yield scrapy.Request(
                url=website.url,
                callback=self.parse,
                cb_kwargs={'website_id': website.id},
                errback=self.handle_error,
                dont_filter=True,
                meta={
                    'start_time': time.time(),
                    'download_latency': 0,
                }
            )
    
    def parse(self, response, website_id):
        end_time = time.time()
        start_time = response.meta['start_time']
        
        # Criar métrica básica
        metric = Metric(
            website_id=website_id,
            response_time=end_time - start_time,
            status_code=response.status,
            content_length=len(response.body),
            headers=dict(response.headers)
        )
        self.session.add(metric)
        
        # Análise de conteúdo
        text_content = ' '.join(response.css('body ::text').getall())
        blob = TextBlob(text_content)
        
        content_analysis = ContentAnalysis(
            metric_id=metric.id,
            content_type=response.headers.get('Content-Type', b'').decode(),
            content_hash=hashlib.sha256(response.body).hexdigest(),
            keywords=json.dumps(list(set(word.lower() for word in blob.words))),
            sentiment=blob.sentiment.polarity,
            language=blob.detect_language()
        )
        self.session.add(content_analysis)
        
        # Métricas de rede
        network_metric = NetworkMetric(
            metric_id=metric.id,
            dns_resolution_time=response.meta.get('download_latency', 0),
            total_time=end_time - start_time
        )
        self.session.add(network_metric)
        
        self.session.commit()
    
    def handle_error(self, failure):
        request = failure.request
        website_id = request.cb_kwargs['website_id']
        
        metric = Metric(
            website_id=website_id,
            status_code=0,
            error_message=str(failure.value)
        )
        self.session.add(metric)
        self.session.commit()
