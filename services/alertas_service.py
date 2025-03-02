class AlertasService:
    def __init__(self):
        self.monitor = MonitoramentoService()
        self.notificador = NotificadorService()
    
    def configurar_alertas(self, config):
        try:
            alertas = {
                'mencoes_negativas': config.get('alertar_mencoes_negativas', True),
                'alcance_significativo': config.get('alertar_alcance', True),
                'limite_mencoes': config.get('limite_mencoes', 100),
                'canais_notificacao': config.get('canais', ['email', 'slack'])
            }
            
            return self.db.salvar_config_alertas(alertas)
        except Exception as e:
            logging.error(f"Erro na configuração de alertas: {str(e)}")
            raise

    def monitorar_e_alertar(self):
        try:
            mencoes = self.monitor.get_mencoes_recentes()
            for mencao in mencoes:
                if self.avaliar_necessidade_alerta(mencao):
                    self.notificador.enviar_alerta(mencao)
        except Exception as e:
            logging.error(f"Erro no monitoramento: {str(e)}")
            raise 