
import React from "react";
import { Clock, FileText, Eye, CheckCircle, Send, LineChart } from "lucide-react";
import StepProgress from "./StepProgress";
import StepItem from "./StepItem";

const Guide: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "Criação do Release",
      icon: FileText,
      description: "A primeira etapa é criar seu release utilizando nosso editor especializado:",
      isActive: true,
      steps: [
        'Acesse a aba "Assessoria de Imprensa" e depois "Criar Release"',
        'Preencha o título e subtítulo do release - eles devem ser impactantes e diretos',
        'Escreva o conteúdo do release, seguindo as boas práticas jornalísticas (responda: quem, o quê, quando, onde, como e por quê)',
        'Adicione citações relevantes de especialistas ou porta-vozes da organização',
        'Inclua links para materiais complementares (fotos, vídeos, estudos)',
        'Selecione os veículos-alvo para distribuição',
        'Clique em "Enviar para Aprovação" quando finalizar'
      ]
    },
    {
      number: 2,
      title: "Revisão do Conteúdo",
      icon: Eye,
      description: "Depois de enviar, seu release passa por um processo de revisão:",
      steps: [
        'Nossa equipe de jornalistas especializados analisa o conteúdo',
        'Verificamos a aderência às boas práticas jornalísticas',
        'Avaliamos a relevância para os veículos selecionados',
        'Sugerimos ajustes quando necessário',
        'Você recebe notificações sobre o status da revisão',
        'Se houver sugestões, você pode editar e reenviar o release'
      ]
    },
    {
      number: 3,
      title: "Aprovação",
      icon: CheckCircle,
      description: "O processo de aprovação é crucial para garantir a qualidade:",
      steps: [
        'Releases revisados passam para a fase de aprovação',
        'Nossa equipe editorial avalia a adequação aos veículos-alvo',
        'Verificamos a precisão de todos os dados e informações',
        'Fazemos uma última checagem de formatação e estilo',
        'Você recebe uma notificação de aprovação ou rejeição',
        'Releases aprovados seguem para distribuição'
      ]
    },
    {
      number: 4,
      title: "Distribuição",
      icon: Send,
      description: "A fase de distribuição envia seu release para os veículos selecionados:",
      steps: [
        'Releases são enviados para nossa base de contatos jornalísticos',
        'A distribuição é segmentada por área de interesse e veículos',
        'O sistema registra todos os envios realizados',
        'Os jornalistas podem acessar materiais complementares via links',
        'Confirmamos o recebimento sempre que possível',
        'O status muda para "Distribuído" no seu painel'
      ]
    },
    {
      number: 5,
      title: "Monitoramento e Relatórios",
      icon: LineChart,
      description: "Acompanhe o desempenho dos seus releases:",
      steps: [
        'Acesse a aba "Acompanhamento" para ver o status de cada release',
        'Veja quais veículos publicaram seu conteúdo',
        'Acesse links diretos para as publicações',
        'Analise estatísticas de desempenho no dashboard',
        'Exporte relatórios detalhados por período',
        'Compare o desempenho entre diferentes releases',
        'Utilize os insights para aprimorar futuras comunicações'
      ],
      isLast: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-500" />
          Passo a Passo do Sistema
        </h2>
        
        <p className="text-muted-foreground mb-6">
          Guia detalhado com todas as etapas do processo de assessoria de imprensa.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <StepProgress />

          <div className="md:col-span-9">
            <div className="space-y-8">
              {steps.map((step) => (
                <StepItem 
                  key={step.number}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                  isActive={step.isActive}
                  steps={step.steps}
                  isLast={step.isLast}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
