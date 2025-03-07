from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, JSON, ForeignKey, Text, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from geoalchemy2 import Geometry

Base = declarative_base()

class Website(Base):
    __tablename__ = 'websites'

    id = Column(Integer, primary_key=True)
    url = Column(String(500), nullable=False)
    name = Column(String(200))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    monitoring_configs = relationship("MonitoringConfig", back_populates="website")
    metrics = relationship("Metric", back_populates="website")

class MonitoringConfig(Base):
    __tablename__ = 'monitoring_configs'

    id = Column(Integer, primary_key=True)
    website_id = Column(Integer, ForeignKey('websites.id'))
    frequency = Column(Integer)  # Em segundos
    enabled = Column(Boolean, default=True)
    alert_threshold = Column(Float)
    alert_email = Column(String(200))
    created_at = Column(DateTime, default=datetime.utcnow)
    website = relationship("Website", back_populates="monitoring_configs")

class Metric(Base):
    __tablename__ = 'metrics'

    id = Column(Integer, primary_key=True)
    website_id = Column(Integer, ForeignKey('websites.id'))
    timestamp = Column(DateTime, default=datetime.utcnow)
    response_time = Column(Float)  # Em segundos
    status_code = Column(Integer)
    content_length = Column(Integer)
    sentiment_score = Column(Float)
    anomaly_score = Column(Float)
    location = Column(Geometry('POINT'))
    headers = Column(JSON)
    error_message = Column(Text)
    website = relationship("Website", back_populates="metrics")

class ContentAnalysis(Base):
    __tablename__ = 'content_analysis'

    id = Column(Integer, primary_key=True)
    metric_id = Column(Integer, ForeignKey('metrics.id'))
    content_type = Column(String(50))
    content_hash = Column(String(64))
    keywords = Column(JSON)
    entities = Column(JSON)
    sentiment = Column(Float)
    language = Column(String(10))
    created_at = Column(DateTime, default=datetime.utcnow)

class NetworkMetric(Base):
    __tablename__ = 'network_metrics'

    id = Column(Integer, primary_key=True)
    metric_id = Column(Integer, ForeignKey('metrics.id'))
    dns_resolution_time = Column(Float)
    connection_time = Column(Float)
    tls_handshake_time = Column(Float)
    first_byte_time = Column(Float)
    total_time = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)

class Alert(Base):
    __tablename__ = 'alerts'

    id = Column(Integer, primary_key=True)
    website_id = Column(Integer, ForeignKey('websites.id'))
    metric_id = Column(Integer, ForeignKey('metrics.id'))
    alert_type = Column(String(50))
    severity = Column(String(20))
    message = Column(Text)
    acknowledged = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    acknowledged_at = Column(DateTime)
