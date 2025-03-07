import redis
import json
from datetime import datetime, timedelta
import os

class RedisCache:
    def __init__(self):
        self.redis_client = redis.Redis(
            host=os.getenv('REDIS_HOST', 'localhost'),
            port=int(os.getenv('REDIS_PORT', 6379)),
            db=0
        )
        
    def set_metric(self, website_id, metric_data, expire_time=3600):
        """
        Armazena uma métrica no cache
        """
        key = f"metric:{website_id}:{datetime.now().timestamp()}"
        self.redis_client.setex(
            key,
            expire_time,
            json.dumps(metric_data)
        )
    
    def get_recent_metrics(self, website_id, minutes=60):
        """
        Obtém métricas recentes para um website
        """
        pattern = f"metric:{website_id}:*"
        metrics = []
        
        for key in self.redis_client.scan_iter(match=pattern):
            data = self.redis_client.get(key)
            if data:
                metric = json.loads(data)
                timestamp = float(key.split(':')[-1])
                if datetime.fromtimestamp(timestamp) > datetime.now() - timedelta(minutes=minutes):
                    metrics.append(metric)
        
        return metrics
    
    def set_alert(self, website_id, alert_data):
        """
        Armazena um alerta no cache
        """
        key = f"alert:{website_id}:{datetime.now().timestamp()}"
        self.redis_client.setex(
            key,
            86400,  # 24 horas
            json.dumps(alert_data)
        )
    
    def get_active_alerts(self, website_id=None):
        """
        Obtém alertas ativos
        """
        pattern = f"alert:{'*' if website_id is None else website_id}:*"
        alerts = []
        
        for key in self.redis_client.scan_iter(match=pattern):
            data = self.redis_client.get(key)
            if data:
                alerts.append(json.loads(data))
        
        return alerts
