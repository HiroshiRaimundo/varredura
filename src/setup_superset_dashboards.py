from superset import app, db
from superset.models import core as models
import json

def create_monitoring_database():
    database = models.Database(
        database_name='Monitoring DB',
        sqlalchemy_uri='postgresql://superset:superset@postgres:5432/superset',
        cache_timeout=300,
        expose_in_sqllab=True
    )
    db.session.add(database)
    db.session.commit()
    return database

def create_response_time_chart(database):
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
    
    slice = models.Slice(
        slice_name=slice_name,
        datasource_type='table',
        datasource_id=database.id,
        params=json.dumps(params, indent=4),
        viz_type=viz_type
    )
    db.session.add(slice)
    db.session.commit()
    return slice

def create_heatmap_chart(database):
    slice_name = "Anomaly Heatmap"
    viz_type = "heatmap"
    params = {
        "viz_type": viz_type,
        "all_columns_x": ["website_id"],
        "all_columns_y": ["status_code"],
        "metric": {"expressionType": "SIMPLE", "column": {"column_name": "anomaly_score"}, "aggregate": "AVG"},
        "row_limit": 10000,
    }
    
    slice = models.Slice(
        slice_name=slice_name,
        datasource_type='table',
        datasource_id=database.id,
        params=json.dumps(params, indent=4),
        viz_type=viz_type
    )
    db.session.add(slice)
    db.session.commit()
    return slice

def create_sentiment_chart(database):
    slice_name = "Sentiment Analysis"
    viz_type = "bar"
    params = {
        "viz_type": viz_type,
        "metrics": [{"expressionType": "SIMPLE", "column": {"column_name": "sentiment"}, "aggregate": "AVG"}],
        "groupby": ["website_id"],
        "row_limit": 50,
    }
    
    slice = models.Slice(
        slice_name=slice_name,
        datasource_type='table',
        datasource_id=database.id,
        params=json.dumps(params, indent=4),
        viz_type=viz_type
    )
    db.session.add(slice)
    db.session.commit()
    return slice

def create_monitoring_dashboard():
    print("Criando banco de dados...")
    database = create_monitoring_database()
    
    print("Criando gráficos...")
    response_chart = create_response_time_chart(database)
    heatmap_chart = create_heatmap_chart(database)
    sentiment_chart = create_sentiment_chart(database)
    
    print("Criando dashboard...")
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
    
    print("Dashboard criado com sucesso!")

if __name__ == '__main__':
    with app.app_context():
        create_monitoring_dashboard()
