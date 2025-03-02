class DemoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            demoData: null
        };
    }

    componentDidMount() {
        const demoManager = new DemoPagesManager();
        const data = demoManager.showDemo(this.props.tipo);
        
        // Simular carregamento para parecer mais real
        setTimeout(() => {
            this.setState({
                loading: false,
                demoData: data
            });
        }, 800);
    }

    render() {
        if (this.state.loading) {
            return <LoadingSpinner />;
        }

        const { titulo, dados } = this.state.demoData;

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
    }
} 