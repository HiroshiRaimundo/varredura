class WorkflowService:
    def __init__(self):
        self.db = DatabaseConnection()
        self.historico = HistoricoManager()
    
    def criar_workflow_aprovacao(self, release_id):
        try:
            workflow = {
                'status': 'pendente',
                'etapas': [
                    {'nome': 'revisao_inicial', 'responsavel': 'editor'},
                    {'nome': 'aprovacao_conteudo', 'responsavel': 'coordenador'},
                    {'nome': 'aprovacao_final', 'responsavel': 'diretor'}
                ],
                'historico_versoes': [],
                'comentarios': []
            }
            
            return self.db.criar_workflow(release_id, workflow)
        except Exception as e:
            logging.error(f"Erro ao criar workflow: {str(e)}")
            raise

    def versionar_release(self, release_id, alteracoes):
        try:
            versao = {
                'data': datetime.now(),
                'alteracoes': alteracoes,
                'autor': get_current_user()
            }
            
            self.historico.adicionar_versao(release_id, versao)
            return versao
        except Exception as e:
            logging.error(f"Erro ao versionar: {str(e)}")
            raise 