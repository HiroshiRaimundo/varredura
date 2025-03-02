interface TimeData {
    date: string;
    value: number;
}

const generateMockTimeData = (days: number): TimeData[] => {
    const data: TimeData[] = [];
    const now = new Date();
    
    for (let i = 0; i < days; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        data.push({
            date: date.toISOString().split('T')[0],
            value: Math.floor(Math.random() * 100)
        });
    }
    
    return data;
};

export const observatorioMockData = {
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
    // ... resto do código permanece igual
};

// Exportar todos os dados mock
export {
    pesquisadorMockData,
    politicoMockData,
    jornalistaMockData,
    instituicaoMockData
};