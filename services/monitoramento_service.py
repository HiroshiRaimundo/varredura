class MonitoramentoService:
    def __init__(self):
        self.metricas = MetricasService()
    
    def monitorar_publicacoes(self, release_id):
        try:
            # Buscar menções em veículos
            mencoes = self.buscar_mencoes(release_id)
            
            # Análise de sentimento
            analise = self.analisar_sentimento(mencoes)
            
            # Calcular métricas
            metricas = self.metricas.calcular_metricas(mencoes)
            
            return {
                'mencoes': mencoes,
                'analise': analise,
                'metricas': metricas
            }
        except Exception as e:
            logging.error(f"Erro no monitoramento: {str(e)}")
            raise 