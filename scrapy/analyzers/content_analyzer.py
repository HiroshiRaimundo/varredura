from typing import Dict, List, Any
import networkx as nx
from textblob import TextBlob
from collections import Counter
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import DBSCAN
import pandas as pd

class ContentAnalyzer:
    def __init__(self):
        self.graph = nx.DiGraph()
        self.vectorizer = TfidfVectorizer(stop_words='portuguese')
        
    def analyze_network(self, url: str, links: List[str]) -> Dict[str, Any]:
        """Analisa a estrutura de links e retorna métricas de rede"""
        self.graph.add_node(url)
        for link in links:
            self.graph.add_edge(url, link)
        
        return {
            'centrality': nx.degree_centrality(self.graph),
            'page_rank': nx.pagerank(self.graph),
            'communities': list(nx.community.greedy_modularity_communities(self.graph.to_undirected())),
            'hub_score': nx.hub_score(self.graph),
            'authority_score': nx.authority_score(self.graph)
        }
    
    def analyze_text(self, text: str) -> Dict[str, Any]:
        """Analisa o conteúdo textual para sentimentos e padrões"""
        blob = TextBlob(text)
        
        # Análise de sentimento
        sentiment = blob.sentiment
        
        # Extração de frases-chave
        phrases = [str(sentence) for sentence in blob.sentences]
        
        # Análise de frequência de palavras
        words = [word.lower() for word in blob.words]
        word_freq = Counter(words)
        
        return {
            'sentiment': {
                'polarity': sentiment.polarity,
                'subjectivity': sentiment.subjectivity
            },
            'key_phrases': phrases[:5],  # Top 5 frases
            'word_frequency': dict(word_freq.most_common(10)),  # Top 10 palavras
            'language_metrics': {
                'avg_sentence_length': np.mean([len(str(s).split()) for s in blob.sentences]),
                'vocabulary_richness': len(set(words)) / len(words) if words else 0
            }
        }
    
    def detect_anomalies(self, data_points: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Detecta anomalias nos dados coletados"""
        if not data_points:
            return {}
            
        df = pd.DataFrame(data_points)
        
        # Análise temporal
        if 'timestamp' in df.columns:
            df['timestamp'] = pd.to_datetime(df['timestamp'])
            time_diffs = df['timestamp'].diff()
            time_anomalies = time_diffs > time_diffs.mean() + 2 * time_diffs.std()
        
        # Análise de conteúdo usando DBSCAN
        if 'content' in df.columns:
            text_features = self.vectorizer.fit_transform(df['content'])
            clustering = DBSCAN(eps=0.3, min_samples=2)
            clusters = clustering.fit_predict(text_features.toarray())
            content_anomalies = clusters == -1
            
        return {
            'time_anomalies': time_anomalies.tolist() if 'timestamp' in df.columns else [],
            'content_anomalies': content_anomalies.tolist() if 'content' in df.columns else [],
            'statistics': {
                'total_anomalies': sum(content_anomalies) if 'content' in df.columns else 0,
                'anomaly_percentage': (sum(content_anomalies) / len(df) * 100) if 'content' in df.columns else 0
            }
        }
    
    def generate_report(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Gera relatório automatizado com insights"""
        network_metrics = data.get('network_analysis', {})
        content_metrics = data.get('content_analysis', {})
        anomaly_metrics = data.get('anomaly_detection', {})
        
        insights = []
        
        # Análise de rede
        if network_metrics:
            top_hubs = sorted(network_metrics['hub_score'].items(), key=lambda x: x[1], reverse=True)[:5]
            insights.append({
                'type': 'network',
                'title': 'Principais Hubs de Informação',
                'description': f'Identificados {len(top_hubs)} principais pontos de distribuição de conteúdo',
                'data': top_hubs
            })
        
        # Análise de conteúdo
        if content_metrics:
            sentiment = content_metrics.get('sentiment', {})
            if sentiment:
                insights.append({
                    'type': 'sentiment',
                    'title': 'Análise de Sentimento',
                    'description': 'Tendência geral do conteúdo',
                    'data': {
                        'polaridade': sentiment['polarity'],
                        'subjetividade': sentiment['subjectivity']
                    }
                })
        
        # Análise de anomalias
        if anomaly_metrics:
            stats = anomaly_metrics.get('statistics', {})
            if stats:
                insights.append({
                    'type': 'anomalies',
                    'title': 'Detecção de Anomalias',
                    'description': 'Padrões incomuns identificados',
                    'data': {
                        'total': stats['total_anomalies'],
                        'percentual': f"{stats['anomaly_percentage']:.2f}%"
                    }
                })
        
        return {
            'summary': {
                'total_insights': len(insights),
                'timestamp': pd.Timestamp.now().isoformat()
            },
            'insights': insights,
            'recommendations': self._generate_recommendations(insights)
        }
    
    def _generate_recommendations(self, insights: List[Dict[str, Any]]) -> List[Dict[str, str]]:
        """Gera recomendações baseadas nos insights"""
        recommendations = []
        
        for insight in insights:
            if insight['type'] == 'network':
                recommendations.append({
                    'category': 'Estrutura de Rede',
                    'action': 'Monitorar principais hubs para mudanças significativas'
                })
            
            elif insight['type'] == 'sentiment':
                polarity = insight['data']['polaridade']
                if polarity < -0.2:
                    recommendations.append({
                        'category': 'Análise de Sentimento',
                        'action': 'Investigar causas de sentimento negativo no conteúdo'
                    })
            
            elif insight['type'] == 'anomalies':
                if insight['data']['percentual'] > 10:
                    recommendations.append({
                        'category': 'Anomalias',
                        'action': 'Revisar padrões de conteúdo com alto índice de anomalias'
                    })
        
        return recommendations
