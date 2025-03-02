class DistribuicaoService:
    def __init__(self):
        self.fila = FilaDistribuicao()
        self.monitor = MonitorEnvios()
    
    def adicionar_fila_distribuicao(self, release_id, contatos):
        try:
            item_fila = {
                'release_id': release_id,
                'contatos': contatos,
                'prioridade': self.calcular_prioridade(release_id),
                'status': 'aguardando',
                'tentativas': 0
            }
            
            return self.fila.adicionar(item_fila)
        except Exception as e:
            logging.error(f"Erro ao adicionar à fila: {str(e)}")
            raise

    def monitorar_envios(self, release_id):
        return {
            'taxa_abertura': self.monitor.calcular_taxa_abertura(release_id),
            'confirmacoes_recebimento': self.monitor.get_confirmacoes(release_id),
            'status_entregas': self.monitor.get_status_entregas(release_id)
        } 