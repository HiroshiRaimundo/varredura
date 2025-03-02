class MetricasService:
    def calcular_metricas(self, mencoes):
        return {
            'total_publicacoes': len(mencoes),
            'alcance_estimado': self.calcular_alcance(mencoes),
            'sentimento_medio': self.calcular_sentimento_medio(mencoes),
            'principais_veiculos': self.identificar_principais_veiculos(mencoes)
        }
    
    def gerar_relatorio(self, release_id, periodo):
        try:
            dados = self.coletar_dados_periodo(release_id, periodo)
            return {
                'metricas_gerais': self.calcular_metricas(dados),
                'graficos': self.gerar_graficos_desempenho(dados),
                'recomendacoes': self.gerar_recomendacoes(dados)
            }
        except Exception as e:
            logging.error(f"Erro ao gerar relatório: {str(e)}")
            raise 