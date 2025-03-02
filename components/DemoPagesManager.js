import { 
    observatorioMockData,
    pesquisadorMockData,
    politicoMockData,
    jornalistaMockData,
    instituicaoMockData 
} from '../mocks/demo_data';

interface DemoData {
    titulo: string;
    dados: any;
}

interface DemoDataMap {
    [key: string]: DemoData;
}

export class DemoPagesManager {
    private currentDemo: string | null;
    private demoData: DemoDataMap;

    constructor() {
        this.currentDemo = null;
        this.demoData = {
            observatorio: {
                titulo: "Área do Cliente: Observatório",
                dados: observatorioMockData
            },
            pesquisador: {
                titulo: "Área do Cliente: Pesquisador",
                dados: pesquisadorMockData
            },
            politico: {
                titulo: "Área do Cliente: Político",
                dados: politicoMockData
            },
            jornalista: {
                titulo: "Área do Cliente: Jornalista",
                dados: jornalistaMockData
            },
            instituicao: {
                titulo: "Área do Cliente: Instituição",
                dados: instituicaoMockData
            }
        };
    }

    showDemo(tipo: string): DemoData {
        this.currentDemo = tipo;
        return this.demoData[tipo];
    }
} 