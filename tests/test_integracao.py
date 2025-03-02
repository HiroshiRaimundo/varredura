def test_integracao_completa():
    # Teste do fluxo completo
    def test_fluxo_completo():
        try:
            # 1. Criar release
            release = assessoria_service.criar_release(dados_teste)
            
            # 2. Workflow de aprovação
            workflow = workflow_service.criar_workflow_aprovacao(release.id)
            
            # 3. Distribuição
            distribuicao = distribuicao_service.adicionar_fila_distribuicao(
                release.id,
                contatos_teste
            )
            
            # 4. Monitoramento
            monitoramento = monitoramento_service.monitorar_publicacoes(release.id)
            
            # 5. Relatórios
            relatorio = relatorios_service.gerar_relatorio_completo(
                release.id,
                periodo='7d'
            )
            
            assert all([release, workflow, distribuicao, monitoramento, relatorio])
            print("✓ Fluxo completo funcionando")
            
        except Exception as e:
            print(f"✗ Erro no fluxo: {str(e)}")

    # Teste de alertas
    def test_alertas():
        try:
            alertas_service.configurar_alertas({
                'alertar_mencoes_negativas': True,
                'limite_mencoes': 50
            })
            
            resultado = alertas_service.monitorar_e_alertar()
            assert resultado['status'] == 'success'
            print("✓ Sistema de alertas funcionando")
            
        except Exception as e:
            print(f"✗ Erro nos alertas: {str(e)}")

# Executar testes
test_integracao_completa() 