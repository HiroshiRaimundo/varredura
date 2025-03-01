
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info, HelpCircle, FileText, BarChart2, ExternalLink, CheckCircle, Clock } from "lucide-react";

const PressReleaseHelp: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="guide">Passo a Passo</TabsTrigger>
            <TabsTrigger value="faq">Perguntas Frequentes</TabsTrigger>
            <TabsTrigger value="best-practices">Melhores Práticas</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-500" />
                Sobre a Assessoria de Imprensa
              </h2>
              
              <p className="text-muted-foreground">
                Nosso sistema de assessoria de imprensa foi desenvolvido para simplificar o processo de 
                criação, aprovação e monitoramento de releases para nossos clientes.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-blue-500" />
                    Criação de Releases
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Escreva e formate releases profissionais com nossa ferramenta intuitiva. 
                    Inclua links para arquivos de mídia, fotos e documentos relevantes.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Processo de Aprovação
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Cada release passa por um processo de aprovação por nossa equipe de especialistas
                    antes de ser enviado aos jornalistas cadastrados.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                    <ExternalLink className="h-4 w-4 text-purple-500" />
                    Distribuição
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Após aprovação, os releases são distribuídos para veículos e jornalistas 
                    relevantes ao seu setor, maximizando as chances de publicação.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                    <BarChart2 className="h-4 w-4 text-orange-500" />
                    Monitoramento
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Acompanhe o desempenho dos seus releases e veja onde foram publicados 
                    com nosso sistema de monitoramento automático.
                  </p>
                </div>
              </div>
            </div>

            <Alert className="bg-blue-50 border-blue-200 mt-6">
              <HelpCircle className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-700">Precisa de ajuda adicional?</AlertTitle>
              <AlertDescription className="text-blue-600">
                Nossa equipe está disponível para auxiliar com dúvidas específicas sobre o processo.
                Entre em contato pelo e-mail: suporte@assessoria.com
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="guide" className="space-y-6">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                Passo a Passo do Sistema
              </h2>
              
              <p className="text-muted-foreground mb-6">
                Siga este guia detalhado para maximizar o potencial da nossa plataforma de assessoria de imprensa.
              </p>

              <div className="space-y-8">
                <div className="relative pl-8 pb-8 border-l-2 border-gray-200">
                  <div className="absolute left-[-9px] top-0 bg-primary text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                    1
                  </div>
                  <h3 className="font-semibold text-lg">Acesso ao Sistema</h3>
                  <p className="text-muted-foreground">
                    Faça login com suas credenciais exclusivas fornecidas pela nossa equipe.
                    Cada cliente tem acesso personalizado ao sistema.
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground">
                    <li>Acesse a página de login específica para clientes</li>
                    <li>Insira seu email e senha</li>
                    <li>Selecione o tipo de cliente (Observatório, Pesquisador, etc.)</li>
                  </ul>
                </div>
                
                <div className="relative pl-8 pb-8 border-l-2 border-gray-200">
                  <div className="absolute left-[-9px] top-0 bg-primary text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                    2
                  </div>
                  <h3 className="font-semibold text-lg">Criação de Release</h3>
                  <p className="text-muted-foreground">
                    Utilize o editor para criar seu release com todas as informações necessárias.
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground">
                    <li>Acesse a aba "Criar Release"</li>
                    <li>Preencha os campos obrigatórios (título, subtítulo, autor, conteúdo)</li>
                    <li>Utilize as ferramentas de formatação para destacar informações importantes</li>
                    <li>Adicione links para arquivos de mídia relevantes</li>
                    <li>Especifique veículos de mídia alvo, se necessário</li>
                  </ul>
                </div>
                
                <div className="relative pl-8 pb-8 border-l-2 border-gray-200">
                  <div className="absolute left-[-9px] top-0 bg-primary text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                    3
                  </div>
                  <h3 className="font-semibold text-lg">Processo de Aprovação</h3>
                  <p className="text-muted-foreground">
                    Após o envio, seu release passará por um processo de análise e aprovação.
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground">
                    <li>O status inicial do release será "Pendente"</li>
                    <li>Nossa equipe de especialistas revisará o conteúdo</li>
                    <li>Você receberá notificações sobre a aprovação ou rejeição</li>
                    <li>Em caso de rejeição, você poderá editar e reenviar</li>
                  </ul>
                </div>
                
                <div className="relative pl-8 pb-8 border-l-2 border-gray-200">
                  <div className="absolute left-[-9px] top-0 bg-primary text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                    4
                  </div>
                  <h3 className="font-semibold text-lg">Distribuição</h3>
                  <p className="text-muted-foreground">
                    Releases aprovados são distribuídos para jornalistas e veículos relevantes.
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground">
                    <li>O status do release mudará para "Aprovado"</li>
                    <li>Nossa equipe enviará o release para os veículos adequados</li>
                    <li>A distribuição considera o tipo de cliente e o tema do release</li>
                    <li>O envio é feito para jornalistas cadastrados em nossa base</li>
                  </ul>
                </div>
                
                <div className="relative pl-8 pb-8 border-l-2 border-gray-200">
                  <div className="absolute left-[-9px] top-0 bg-primary text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                    5
                  </div>
                  <h3 className="font-semibold text-lg">Monitoramento</h3>
                  <p className="text-muted-foreground">
                    Acompanhe o desempenho dos seus releases no dashboard.
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground">
                    <li>Acesse a aba "Acompanhamento" para ver o status atual</li>
                    <li>Visualize onde seus releases foram publicados</li>
                    <li>Acesse links diretos para as publicações</li>
                    <li>Acompanhe métricas e estatísticas no dashboard</li>
                    <li>Configure alertas para novas publicações</li>
                  </ul>
                </div>
                
                <div className="relative pl-8">
                  <div className="absolute left-[-9px] top-0 bg-primary text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                    6
                  </div>
                  <h3 className="font-semibold text-lg">Relatórios e Análises</h3>
                  <p className="text-muted-foreground">
                    Utilize os relatórios para medir o impacto da sua assessoria de imprensa.
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground">
                    <li>Acesse estatísticas detalhadas no dashboard</li>
                    <li>Visualize tendências de publicação por mês</li>
                    <li>Identifique os veículos com maior taxa de aproveitamento</li>
                    <li>Compare o desempenho com períodos anteriores</li>
                    <li>Exporte relatórios para análise externa</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="faq" className="space-y-4">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-blue-500" />
              Perguntas Frequentes
            </h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Quanto tempo leva para um release ser aprovado?</AccordionTrigger>
                <AccordionContent>
                  O processo de aprovação geralmente leva entre 24 e 48 horas úteis, dependendo do volume 
                  de releases na fila e da complexidade do conteúdo. Releases com temas sensíveis ou que 
                  precisam de verificação adicional podem levar mais tempo.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Como saberei se meu release foi publicado?</AccordionTrigger>
                <AccordionContent>
                  Você será notificado através do sistema quando seu release for publicado em algum veículo. 
                  Além disso, você pode acompanhar o status na aba "Acompanhamento" do dashboard, onde 
                  também terá acesso aos links das publicações.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Posso editar um release já enviado?</AccordionTrigger>
                <AccordionContent>
                  Releases com status "Pendente" ainda podem ser editados. Após a aprovação ou rejeição, 
                  não é possível editar o release original - você precisará criar uma nova versão. 
                  Em caso de rejeição, você receberá feedback sobre as alterações necessárias.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Para quais veículos meu release será enviado?</AccordionTrigger>
                <AccordionContent>
                  Os releases são enviados para veículos e jornalistas relevantes ao tema e ao seu setor. 
                  Nossa base inclui jornalistas de grandes veículos nacionais, portais especializados e 
                  influenciadores digitais. Você pode especificar veículos preferenciais durante a criação 
                  do release.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>Como funciona o sistema de monitoramento?</AccordionTrigger>
                <AccordionContent>
                  Nosso sistema de monitoramento verifica automaticamente os principais veículos de mídia 
                  em busca de publicações relacionadas ao seu release. Utilizamos tecnologia de rastreamento 
                  web e palavras-chave para identificar quando seu conteúdo é publicado, mesmo que tenha 
                  sido editado pelo veículo.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger>Posso acessar o sistema pelo celular?</AccordionTrigger>
                <AccordionContent>
                  Sim, nosso sistema é responsivo e pode ser acessado de qualquer dispositivo com navegador 
                  web, incluindo smartphones e tablets. A interface se adapta automaticamente ao tamanho 
                  da tela, permitindo que você gerencie seus releases em qualquer lugar.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="best-practices" className="space-y-4">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Melhores Práticas
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-4">
                <h3 className="font-semibold text-lg mb-2">Título Impactante</h3>
                <p className="text-sm text-muted-foreground">
                  Crie títulos concisos e impactantes que capturem a essência da notícia.
                  Evite títulos longos ou muito técnicos que podem desencorajar a leitura.
                </p>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-semibold text-lg mb-2">Primeiro Parágrafo Completo</h3>
                <p className="text-sm text-muted-foreground">
                  O primeiro parágrafo deve responder às perguntas essenciais: quem, o quê, 
                  quando, onde, por quê e como. Jornalistas frequentemente decidem se continuarão 
                  lendo com base apenas nesse parágrafo.
                </p>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-semibold text-lg mb-2">Citações Relevantes</h3>
                <p className="text-sm text-muted-foreground">
                  Inclua citações de especialistas ou porta-vozes que agreguem valor e 
                  credibilidade à notícia. Evite citações genéricas ou promocionais em excesso.
                </p>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-semibold text-lg mb-2">Dados e Pesquisas</h3>
                <p className="text-sm text-muted-foreground">
                  Sempre que possível, inclua dados, estatísticas e pesquisas que fundamentem 
                  sua notícia. Informações factuais aumentam significativamente as chances de publicação.
                </p>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-semibold text-lg mb-2">Material Visual</h3>
                <p className="text-sm text-muted-foreground">
                  Ofereça imagens, infográficos ou vídeos de alta qualidade relacionados ao tema. 
                  Conteúdo visual aumenta o interesse e as chances de publicação.
                </p>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-semibold text-lg mb-2">Linguagem Clara</h3>
                <p className="text-sm text-muted-foreground">
                  Use linguagem clara e direta, evitando jargões técnicos excessivos. 
                  Lembre-se que o jornalista pode não ser especialista no seu setor.
                </p>
              </Card>
            </div>
            
            <Alert className="bg-amber-50 border-amber-200 mt-4">
              <Info className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-700">Dica Importante</AlertTitle>
              <AlertDescription className="text-amber-600">
                Releases sobre temas de interesse público, com perspectivas inovadoras ou 
                dados exclusivos têm significativamente mais chances de serem publicados.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PressReleaseHelp;
