class RelatoriosService:
    def __init__(self):
        self.metricas = MetricasService()
        self.graficos = GraficosService()
    
    def gerar_relatorio_completo(self, release_id, periodo):
        try:
            return {
                'metricas_gerais': self.metricas.calcular_metricas_gerais(release_id, periodo),
                'analise_sentimento': self.metricas.analisar_sentimento(release_id),
                'alcance_midia': self.metricas.calcular_alcance_midia(release_id),
                'graficos': self.graficos.gerar_todos_graficos(release_id, periodo),
                'recomendacoes': self.gerar_recomendacoes(release_id),
                'comparativo_historico': self.metricas.comparar_historico(release_id)
            }
        except Exception as e:
            logging.error(f"Erro ao gerar relatório: {str(e)}")
            raise

    def exportar_relatorio(self, relatorio_id, formato='pdf'):
        try:
            return self.exportador.exportar(relatorio_id, formato)
        except Exception as e:
            logging.error(f"Erro na exportação: {str(e)}")
            raise 