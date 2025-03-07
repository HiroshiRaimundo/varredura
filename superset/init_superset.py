import os
import json
from superset.models.dashboard import Dashboard
from superset.models.slice import Slice
from superset.models.core import Database
from superset import db, app

def create_database_connection():
    """Cria conexão com o banco de dados do Koga Monitoramento"""
    database = Database(
        database_name='Koga Monitoramento',
        sqlalchemy_uri='postgresql://user:password@localhost:5432/kogamonitoramento'
    )
    db.session.add(database)
    db.session.commit()
    return database

def create_monitoring_dashboard(database):
    """Cria dashboard principal de monitoramento"""
    
    # 1. Gráfico de série temporal de monitoramentos
    time_series_chart = Slice(
        slice_name="Monitoramentos ao Longo do Tempo",
        viz_type="line",
        datasource_type="table",
        datasource_id=database.id,
        params=json.dumps({
            "viz_type": "line",
            "granularity_sqla": "timestamp",
            "time_grain_sqla": "P1D",
            "metrics": [{"expressionType": "SIMPLE", "column": {"column_name": "id"}, "aggregate": "COUNT"}],
            "adhoc_filters": [],
            "groupby": [],
            "row_limit": 10000,
            "show_legend": True,
            "y_axis_format": "SMART_NUMBER"
        })
    )
    
    # 2. Mapa de calor de anomalias
    anomaly_heatmap = Slice(
        slice_name="Mapa de Calor de Anomalias",
        viz_type="heatmap",
        datasource_type="table",
        datasource_id=database.id,
        params=json.dumps({
            "viz_type": "heatmap",
            "all_columns_x": "url",
            "all_columns_y": "timestamp",
            "metric": {"expressionType": "SIMPLE", "column": {"column_name": "anomaly_score"}, "aggregate": "AVG"},
            "row_limit": 10000
        })
    )
    
    # 3. Análise de sentimento
    sentiment_gauge = Slice(
        slice_name="Análise de Sentimento",
        viz_type="gauge",
        datasource_type="table",
        datasource_id=database.id,
        params=json.dumps({
            "viz_type": "gauge",
            "metric": {"expressionType": "SIMPLE", "column": {"column_name": "sentiment_polarity"}, "aggregate": "AVG"},
            "row_limit": 10000,
            "start": -1,
            "end": 1,
            "ranges": {"Negativo": [-1, -0.1], "Neutro": [-0.1, 0.1], "Positivo": [0.1, 1]}
        })
    )
    
    # 4. Rede de relacionamentos
    network_graph = Slice(
        slice_name="Rede de Relacionamentos",
        viz_type="network",
        datasource_type="table",
        datasource_id=database.id,
        params=json.dumps({
            "viz_type": "network",
            "source": "url",
            "target": "linked_url",
            "metric": {"expressionType": "SIMPLE", "column": {"column_name": "hub_score"}, "aggregate": "AVG"}
        })
    )
    
    # Salva os gráficos
    slices = [time_series_chart, anomaly_heatmap, sentiment_gauge, network_graph]
    for s in slices:
        db.session.add(s)
    db.session.commit()
    
    # Cria o dashboard
    dashboard = Dashboard(
        dashboard_title="Monitoramento Web",
        slug="monitoramento-web",
        slices=slices,
        position_json=json.dumps({
            "DASHBOARD_VERSION_KEY": "v2",
            "GRID_ID": {
                "children": [
                    {"id": "CHART-" + str(time_series_chart.id), "meta": {"width": 6, "height": 50}},
                    {"id": "CHART-" + str(anomaly_heatmap.id), "meta": {"width": 6, "height": 50}},
                    {"id": "CHART-" + str(sentiment_gauge.id), "meta": {"width": 6, "height": 50}},
                    {"id": "CHART-" + str(network_graph.id), "meta": {"width": 6, "height": 50}}
                ]
            }
        })
    )
    
    db.session.add(dashboard)
    db.session.commit()
    return dashboard

def main():
    with app.app_context():
        # Cria conexão com o banco
        database = create_database_connection()
        
        # Cria dashboard principal
        dashboard = create_monitoring_dashboard(database)
        
        print(f"Dashboard criado com sucesso! ID: {dashboard.id}")

if __name__ == "__main__":
    main()
