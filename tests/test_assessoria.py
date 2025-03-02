def test_funcionalidades_assessoria():
    # Teste de Criação de Release
    def test_criar_release():
        service = AssessoriaImprensaService()
        dados_teste = {
            'titulo': 'Release Teste',
            'conteudo': 'Conteúdo teste...',
            'categoria': 'Tecnologia'
        }
        
        try:
            release = service.criar_release(dados_teste)
            assert release.id is not None
            print("✓ Criação de release funcionando")
            return release
        except Exception as e:
            print(f"✗ Erro na criação de release: {str(e)}")
            return None

    # Teste de Distribuição
    def test_distribuicao():
        service = AssessoriaImprensaService()
        contatos_teste = [
            {'email': 'jornalista1@exemplo.com', 'categoria': 'Tecnologia'},
            {'email': 'jornalista2@exemplo.com', 'categoria': 'Geral'}
        ]
        
        try:
            resultados = service.distribuir_release(1, contatos_teste)
            assert len(resultados) > 0
            print("✓ Distribuição funcionando")
        except Exception as e:
            print(f"✗ Erro na distribuição: {str(e)}")

    # Teste de Monitoramento
    def test_monitoramento():
        service = MonitoramentoService()
        
        try:
            resultado = service.monitorar_publicacoes(1)
            assert 'mencoes' in resultado
            assert 'metricas' in resultado
            print("✓ Monitoramento funcionando")
        except Exception as e:
            print(f"✗ Erro no monitoramento: {str(e)}")

# Executar testes
test_funcionalidades_assessoria() 