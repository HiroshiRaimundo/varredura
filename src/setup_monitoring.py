from flask import Flask
from flask_appbuilder import AppBuilder, SQLA
import os

app = Flask(__name__)
app.config.from_object('superset.config')
db = SQLA(app)
appbuilder = AppBuilder(app, db.session)

from sqlalchemy import create_engine, text
import json

def setup_monitoring_database():
    """Configura o banco de dados de monitoramento no Superset"""
    # Criar engine para executar comandos SQL
    engine = create_engine('postgresql://superset:superset@postgres:5432/superset')
    
    # Criar tabelas de monitoramento
    with engine.begin() as connection:
        connection.execute(text("""
            CREATE TABLE IF NOT EXISTS websites (
                id SERIAL PRIMARY KEY,
                url VARCHAR(500) NOT NULL,
                name VARCHAR(200),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS monitoring_configs (
                id SERIAL PRIMARY KEY,
                website_id INTEGER REFERENCES websites(id),
                frequency INTEGER,
                enabled BOOLEAN DEFAULT TRUE,
                alert_threshold FLOAT,
                alert_email VARCHAR(200),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS metrics (
                id SERIAL PRIMARY KEY,
                website_id INTEGER REFERENCES websites(id),
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                response_time FLOAT,
                status_code INTEGER,
                content_length INTEGER,
                sentiment_score FLOAT,
                anomaly_score FLOAT,
                location GEOMETRY(POINT),
                headers JSONB,
                error_message TEXT
            );

            CREATE TABLE IF NOT EXISTS content_analysis (
                id SERIAL PRIMARY KEY,
                metric_id INTEGER REFERENCES metrics(id),
                content_type VARCHAR(50),
                content_hash VARCHAR(64),
                keywords JSONB,
                entities JSONB,
                sentiment FLOAT,
                language VARCHAR(10),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS network_metrics (
                id SERIAL PRIMARY KEY,
                metric_id INTEGER REFERENCES metrics(id),
                dns_resolution_time FLOAT,
                connection_time FLOAT,
                tls_handshake_time FLOAT,
                first_byte_time FLOAT,
                total_time FLOAT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS alerts (
                id SERIAL PRIMARY KEY,
                website_id INTEGER REFERENCES websites(id),
                metric_id INTEGER REFERENCES metrics(id),
                alert_type VARCHAR(50),
                severity VARCHAR(20),
                message TEXT,
                acknowledged BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                acknowledged_at TIMESTAMP
            );
        """))

    # Criar conexão com o banco de dados no Superset
    with app.app_context():
        from superset.models import core as models
        
        database = models.Database(
            database_name='Monitoring DB',
            sqlalchemy_uri='postgresql://superset:superset@postgres:5432/superset',
            cache_timeout=300,
            expose_in_sqllab=True
        )
        db.session.add(database)
        db.session.commit()
        
        return database

def create_monitoring_dashboard(database):
    """Cria dashboards de monitoramento no Superset"""
    with app.app_context():
        from superset.models import core as models
        
        # Criar slice para tempo de resposta
        slice_name = "Response Time Over Time"
        viz_type = "line"
        params = {
            "viz_type": viz_type,
            "granularity_sqla": "timestamp",
            "time_grain_sqla": "P1D",
            "metrics": [{"expressionType": "SIMPLE", "column": {"column_name": "response_time"}, "aggregate": "AVG"}],
            "adhoc_filters": [],
            "groupby": ["website_id"],
            "row_limit": 10000,
        }
        
        response_chart = models.Slice(
            slice_name=slice_name,
            datasource_type='table',
            datasource_id=database.id,
            params=json.dumps(params, indent=4),
            viz_type=viz_type
        )
        db.session.add(response_chart)
        
        # Criar slice para heatmap de anomalias
        slice_name = "Anomaly Heatmap"
        viz_type = "heatmap"
        params = {
            "viz_type": viz_type,
            "all_columns_x": ["website_id"],
            "all_columns_y": ["status_code"],
            "metric": {"expressionType": "SIMPLE", "column": {"column_name": "anomaly_score"}, "aggregate": "AVG"},
            "row_limit": 10000,
        }
        
        heatmap_chart = models.Slice(
            slice_name=slice_name,
            datasource_type='table',
            datasource_id=database.id,
            params=json.dumps(params, indent=4),
            viz_type=viz_type
        )
        db.session.add(heatmap_chart)
        
        # Criar slice para análise de sentimento
        slice_name = "Sentiment Analysis"
        viz_type = "bar"
        params = {
            "viz_type": viz_type,
            "metrics": [{"expressionType": "SIMPLE", "column": {"column_name": "sentiment"}, "aggregate": "AVG"}],
            "groupby": ["website_id"],
            "row_limit": 50,
        }
        
        sentiment_chart = models.Slice(
            slice_name=slice_name,
            datasource_type='table',
            datasource_id=database.id,
            params=json.dumps(params, indent=4),
            viz_type=viz_type
        )
        db.session.add(sentiment_chart)
        
        # Criar dashboard
        dashboard = models.Dashboard(
            dashboard_title="Website Monitoring",
            position_json=json.dumps({
                "CHART-explorer-1": {
                    "children": [],
                    "id": "CHART-explorer-1",
                    "meta": {"chartId": response_chart.id, "height": 50, "sliceName": "Response Time"},
                    "type": "CHART"
                },
                "CHART-explorer-2": {
                    "children": [],
                    "id": "CHART-explorer-2",
                    "meta": {"chartId": heatmap_chart.id, "height": 50, "sliceName": "Anomaly Heatmap"},
                    "type": "CHART"
                },
                "CHART-explorer-3": {
                    "children": [],
                    "id": "CHART-explorer-3",
                    "meta": {"chartId": sentiment_chart.id, "height": 50, "sliceName": "Sentiment"},
                    "type": "CHART"
                }
            }),
            slices=[response_chart, heatmap_chart, sentiment_chart]
        )
        db.session.add(dashboard)
        db.session.commit()

if __name__ == '__main__':
    print("Configurando banco de dados de monitoramento...")
    database = setup_monitoring_database()
    
    print("Criando dashboards...")
    create_monitoring_dashboard(database)
    
    print("Configuração concluída com sucesso!")
