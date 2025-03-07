from sqlalchemy import create_engine, Column, Integer, String, DateTime, JSON, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()

class Monitoring(Base):
    __tablename__ = 'monitoring'
    
    id = Column(Integer, primary_key=True)
    url = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_check = Column(DateTime)
    status = Column(String)
    check_interval = Column(Integer)  # em minutos
    items = relationship("MonitoringItem", back_populates="monitoring")

class MonitoringItem(Base):
    __tablename__ = 'monitoring_items'
    
    id = Column(Integer, primary_key=True)
    monitoring_id = Column(Integer, ForeignKey('monitoring.id'))
    url = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
    content_hash = Column(String)
    
    # Análise de rede
    centrality = Column(Float)
    page_rank = Column(Float)
    hub_score = Column(Float)
    
    # Análise de conteúdo
    sentiment_polarity = Column(Float)
    sentiment_subjectivity = Column(Float)
    
    # Dados estruturados para Superset
    content_metrics = Column(JSON)  # palavras-chave, frequências, etc
    network_metrics = Column(JSON)  # métricas de rede detalhadas
    geo_data = Column(JSON)  # dados de geolocalização se disponíveis
    
    # Anomalias
    is_anomaly = Column(Integer, default=0)  # 0: normal, 1: anomalia temporal, 2: anomalia de conteúdo
    anomaly_score = Column(Float)
    
    monitoring = relationship("Monitoring", back_populates="items")

class MonitoringReport(Base):
    __tablename__ = 'monitoring_reports'
    
    id = Column(Integer, primary_key=True)
    monitoring_id = Column(Integer, ForeignKey('monitoring.id'))
    timestamp = Column(DateTime, default=datetime.utcnow)
    report_type = Column(String)  # daily, weekly, monthly
    insights = Column(JSON)
    recommendations = Column(JSON)
    metrics = Column(JSON)  # métricas agregadas
    
    monitoring = relationship("Monitoring")

def init_db(database_url):
    engine = create_engine(database_url)
    Base.metadata.create_all(engine)
    return engine
