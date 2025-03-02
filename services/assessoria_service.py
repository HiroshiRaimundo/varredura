class AssessoriaImprensaService:
    def __init__(self):
        self.db = DatabaseConnection()
        self.contatos = ContatosManager()
        self.metricas = MetricasService()
    
    def criar_release(self, dados_release):
        try:
            # Validar dados do release
            self.validar_dados_release(dados_release)
            
            # Criar release no sistema
            novo_release = Release(
                titulo=dados_release['titulo'],
                conteudo=dados_release['conteudo'],
                categoria=dados_release['categoria'],
                data_criacao=datetime.now()
            )
            
            return self.db.salvar_release(novo_release)
        except Exception as e:
            logging.error(f"Erro ao criar release: {str(e)}")
            raise

    def distribuir_release(self, release_id, lista_contatos):
        try:
            release = self.db.get_release(release_id)
            contatos_filtrados = self.contatos.filtrar_por_interesse(
                lista_contatos, 
                release.categoria
            )
            
            resultados = []
            for contato in contatos_filtrados:
                status = self.enviar_email(contato, release)
                resultados.append({
                    'contato': contato,
                    'status': status
                })
            
            return resultados
        except Exception as e:
            logging.error(f"Erro na distribuição: {str(e)}")
            raise 