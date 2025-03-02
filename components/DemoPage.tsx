import React, { useEffect, useState } from 'react';
import { DemoPagesManager } from './DemoPagesManager';
import { LoadingSpinner } from './LoadingSpinner';
import { DashboardDemo } from './DashboardDemo';
import { RelatoriosDemo } from './RelatoriosDemo';
import { MetricasDemo } from './MetricasDemo';

interface DemoPageProps {
    tipo: string;
}

interface DemoData {
    titulo: string;
    dados: any;
}

export const DemoPage: React.FC<DemoPageProps> = ({ tipo }) => {
    const [loading, setLoading] = useState(true);
    const [demoData, setDemoData] = useState<DemoData | null>(null);

    useEffect(() => {
        const demoManager = new DemoPagesManager();
        const data = demoManager.showDemo(tipo);
        
        const timer = setTimeout(() => {
            setLoading(false);
            setDemoData(data);
        }, 800);

        return () => clearTimeout(timer);
    }, [tipo]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!demoData) {
        return null;
    }

    const { titulo, dados } = demoData;

    return (
        <div className="demo-container">
            <header className="demo-header">
                <h1>{titulo}</h1>
                <div className="demo-badge">Demonstração</div>
            </header>

            <div className="demo-content">
                <DashboardDemo data={dados.dashboard} />
                <RelatoriosDemo data={dados.relatorios} />
                <MetricasDemo data={dados} />
            </div>

            <footer className="demo-footer">
                <button className="btn-primary">
                    Solicitar Demonstração Completa
                </button>
            </footer>
        </div>
    );
}; 