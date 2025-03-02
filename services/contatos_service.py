class ContatosService:
    def __init__(self):
        self.db = DatabaseConnection()
        self.atualizador = AtualizadorContatos()
    
    def segmentar_contatos(self, filtros):
        try:
            return self.db.buscar_contatos(filtros)
        except Exception as e:
            logging.error(f"Erro na segmentação: {str(e)}")
            raise

    def registrar_interacao(self, contato_id, tipo_interacao, detalhes):
        try:
            interacao = {
                'data': datetime.now(),
                'tipo': tipo_interacao,
                'detalhes': detalhes,
                'resultado': detalhes.get('resultado')
            }
            
            return self.db.salvar_interacao(contato_id, interacao)
        except Exception as e:
            logging.error(f"Erro ao registrar interação: {str(e)}")
            raise

    def atualizar_contatos_automatico(self):
        try:
            return self.atualizador.executar_atualizacao()
        except Exception as e:
            logging.error(f"Erro na atualização: {str(e)}")
            raise 