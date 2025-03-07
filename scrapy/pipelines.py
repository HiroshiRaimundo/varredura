import json
from datetime import datetime
from itemadapter import ItemAdapter
from scrapy.exceptions import DropItem
import re
from sqlalchemy.orm import sessionmaker
from .models import Monitoring, MonitoringItem, MonitoringReport

class DataCleaningPipeline:
    """Pipeline para limpeza e validação dos dados"""
    
    def process_item(self, item, spider):
        adapter = ItemAdapter(item)
        
        # Validação básica
        if not adapter.get('url'):
            raise DropItem(f"Item sem URL encontrado: {item}")
            
        if not adapter.get('content'):
            raise DropItem(f"Item sem conteúdo encontrado: {item}")
            
        # Limpeza de dados
        if adapter.get('content'):
            content = adapter.get('content')
            # Remove múltiplos espaços
            content = re.sub(r'\s+', ' ', content)
            # Remove caracteres especiais
            content = re.sub(r'[^\w\s.,!?-]', '', content)
            adapter['content'] = content.strip()
            
        if adapter.get('title'):
            adapter['title'] = adapter.get('title').strip()
            
        # Normalização de URLs
        if adapter.get('links'):
            links = adapter.get('links')
            normalized_links = []
            for link in links:
                link = link.strip()
                if not link.startswith(('http://', 'https://')):
                    link = 'https://' + link
                normalized_links.append(link)
            adapter['links'] = list(set(normalized_links))  # Remove duplicatas
            
        return item

class DataEnrichmentPipeline:
    """Pipeline para enriquecimento dos dados"""
    
    def process_item(self, item, spider):
        adapter = ItemAdapter(item)
        
        # Adiciona metadados extras
        adapter['processed_at'] = datetime.now().isoformat()
        
        # Extrai informações adicionais do conteúdo
        if adapter.get('content'):
            content = adapter.get('content')
            
            # Extrai possíveis datas do conteúdo
            date_patterns = [
                r'\d{2}/\d{2}/\d{4}',
                r'\d{2}\.\d{2}\.\d{4}',
                r'\d{4}-\d{2}-\d{2}'
            ]
            dates_found = []
            for pattern in date_patterns:
                dates_found.extend(re.findall(pattern, content))
            if dates_found:
                adapter['extracted_dates'] = dates_found
            
            # Identifica palavras-chave importantes
            important_keywords = [
                'decreto', 'lei', 'portaria', 'edital',
                'licitação', 'contrato', 'processo'
            ]
            found_keywords = [
                word for word in important_keywords
                if word.lower() in content.lower()
            ]
            if found_keywords:
                adapter['keywords'] = found_keywords
        
        return item

class KogaMonitorPipeline:
    """Pipeline principal para salvar os dados processados"""
    
    def __init__(self):
        self.file = None
        
    def open_spider(self, spider):
        filename = f'data_{spider.name}_{datetime.now().strftime("%Y%m%d_%H%M%S")}.json'
        self.file = open(filename, 'w', encoding='utf-8')
        
    def close_spider(self, spider):
        if self.file:
            self.file.close()
            
    def process_item(self, item, spider):
        # Converte para formato adequado para serialização
        adapter = ItemAdapter(item)
        data = dict(adapter)
        
        # Adiciona metadados de processamento
        data['spider_name'] = spider.name
        data['processed_timestamp'] = datetime.now().isoformat()
        
        # Salva no arquivo
        line = json.dumps(data, ensure_ascii=False) + "\n"
        self.file.write(line)
        return item

class PostgreSQLPipeline:
    def __init__(self, database_url):
        self.database_url = database_url
        
    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            database_url=crawler.settings.get('DATABASE_URL')
        )
    
    def open_spider(self, spider):
        """Inicializa a conexão com o banco quando o spider inicia"""
        from .models import init_db
        engine = init_db(self.database_url)
        self.Session = sessionmaker(bind=engine)
    
    def close_spider(self, spider):
        """Fecha a conexão quando o spider termina"""
        pass
    
    def process_item(self, item, spider):
        """Processa e salva os itens no banco de dados"""
        session = self.Session()
        try:
            # Cria ou atualiza o item de monitoramento
            monitoring_item = MonitoringItem(
                monitoring_id=item['monitoring_id'],
                url=item['url'],
                timestamp=datetime.fromisoformat(item['timestamp']),
                content_hash=item['content_hash']
            )
            
            # Adiciona métricas de rede
            network = item['analysis']['network']
            monitoring_item.centrality = network['centrality'].get(item['url'], 0)
            monitoring_item.page_rank = network['pageRank'].get(item['url'], 0)
            monitoring_item.hub_score = network['hubScore'].get(item['url'], 0)
            monitoring_item.network_metrics = network
            
            # Adiciona métricas de conteúdo
            content = item['analysis']['content']
            monitoring_item.sentiment_polarity = content['sentiment']['polarity']
            monitoring_item.sentiment_subjectivity = content['sentiment']['subjectivity']
            monitoring_item.content_metrics = {
                'key_phrases': content.get('keyPhrases', []),
                'word_frequency': content.get('wordFrequency', {})
            }
            
            # Adiciona informações de anomalias
            anomalies = item['analysis']['anomalies']
            if anomalies['timeAnomalies'][-1]:  # verifica última entrada
                monitoring_item.is_anomaly = 1
            elif anomalies['contentAnomalies'][-1]:
                monitoring_item.is_anomaly = 2
            monitoring_item.anomaly_score = anomalies['anomalyPercentage']
            
            # Salva o relatório se existir
            if 'report' in item['analysis']:
                report = MonitoringReport(
                    monitoring_id=item['monitoring_id'],
                    report_type='realtime',
                    insights=item['analysis']['report']['insights'],
                    recommendations=item['analysis']['report']['recommendations'],
                    metrics=item['analysis']['report']['summary']
                )
                session.add(report)
            
            session.add(monitoring_item)
            session.commit()
            
        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()
        
        return item
