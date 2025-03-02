const observatorioMockData = {
    dashboard: {
        graficos: [
            {
                tipo: "linha",
                titulo: "Monitoramento de Mídia",
                dados: generateMockTimeData(30)
            },
            {
                tipo: "pizza",
                titulo: "Distribuição por Fonte",
                dados: {
                    "Jornais": 35,
                    "TV": 25,
                    "Redes Sociais": 30,
                    "Blogs": 10
                }
            }
        ],
        alertasRecentes: [
            {
                titulo: "Pico de menções detectado",
                data: "2024-03-20",
                prioridade: "alta"
            },
            {
                titulo: "Nova fonte relevante identificada",
                data: "2024-03-19",
                prioridade: "média"
            }
        ]
    },
    relatorios: [
        {
            titulo: "Análise Mensal - Março 2024",
            status: "Disponível",
            data: "2024-03-01"
        }
    ],
    fontes: {
        ativas: 150,
        emMonitoramento: 45,
        ultimaAtualizacao: "2024-03-20 15:30"
    }
};

const pesquisadorMockData = {
    projetosPesquisa: [
        {
            titulo: "Análise de Tendências Sociais",
            status: "Em andamento",
            coletas: 1250,
            ultimaAtualizacao: "2024-03-20"
        }
    ],
    dadosColetados: {
        total: 15000,
        hoje: 150,
        graficos: [
            {
                tipo: "barra",
                titulo: "Distribuição por Tema",
                dados: {
                    "Educação": 300,
                    "Saúde": 250,
                    "Tecnologia": 200
                }
            }
        ]
    },
    analises: [
        {
            tipo: "Sentiment Analysis",
            status: "Processando",
            progresso: 75
        }
    ]
};

const politicoMockData = {
    monitoramentoReputacao: {
        mencoes: {
            positivas: 65,
            neutras: 25,
            negativas: 10
        },
        alcance: "2.5M pessoas",
        principais_temas: [
            "Educação",
            "Infraestrutura",
            "Saúde"
        ]
    },
    agenda: [
        {
            evento: "Entrevista TV Local",
            data: "2024-03-21",
            status: "Confirmado"
        }
    ],
    relatoriosDesempenho: [
        {
            periodo: "Março 2024",
            engajamento: "Alto",
            alcance: "Crescente"
        }
    ]
};

const jornalistaMockData = {
    pautas: [
        {
            titulo: "Desenvolvimento Urbano",
            status: "Em produção",
            deadline: "2024-03-25"
        }
    ],
    fontes: {
        entrevistas: [
            {
                nome: "Dr. Silva",
                especialidade: "Urbanismo",
                contato: "***-****"
            }
        ],
        documentos: 15
    },
    estatisticas: {
        materias_publicadas: 45,
        em_producao: 3,
        alcance_total: "1.2M"
    }
};

const instituicaoMockData = {
    comunicacao: {
        releases: [
            {
                titulo: "Nova Iniciativa Social",
                status: "Aprovado",
                distribuicao: "Programada"
            }
        ],
        metricas: {
            alcance_mensal: "500k",
            engajamento: "15%",
            conversao: "3.5%"
        }
    },
    relacionamentos: {
        imprensa: 150,
        stakeholders: 45,
        parceiros: 30
    },
    campanhas: [
        {
            nome: "Responsabilidade Social",
            status: "Ativa",
            resultados: "Positivos"
        }
    ]
}; 