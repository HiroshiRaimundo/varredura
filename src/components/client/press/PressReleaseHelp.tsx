
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { 
  Info, 
  HelpCircle, 
  FileText, 
  BarChart2, 
  ExternalLink, 
  CheckCircle, 
  Clock, 
  Newspaper, 
  Send, 
  Eye, 
  Users, 
  LineChart 
} from "lucide-react";

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
                Guia detalhado com todas as etapas do processo de assessoria de imprensa.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Barra de progresso vertical */}
                <div className="md:col-span-3 space-y-8 hidden md:block">
                  <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-sm mb-3">Progresso do Release</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-primary flex-shrink-0"></div>
                        <span className="text-xs">Criação</span>
                      </div>
                      <div className="w-0.5 h-4 bg-gray-300 ml-2"></div>
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-gray-300 flex-shrink-0"></div>
                        <span className="text-xs text-gray-500">Revisão</span>
                      </div>
                      <div className="w-0.5 h-4 bg-gray-300 ml-2"></div>
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-gray-300 flex-shrink-0"></div>
                        <span className="text-xs text-gray-500">Aprovação</span>
                      </div>
                      <div className="w-0.5 h-4 bg-gray-300 ml-2"></div>
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-gray-300 flex-shrink-0"></div>
                        <span className="text-xs text-gray-500">Distribuição</span>
                      </div>
                      <div className="w-0.5 h-4 bg-gray-300 ml-2"></div>
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-gray-300 flex-shrink-0"></div>
                        <span className="text-xs text-gray-500">Monitoramento</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conteúdo do passo a passo */}
                <div className="md:col-span-9">
                  <div className="space-y-8">
                    <div className="relative pl-8 pb-8 border-l-2 border-gray-200">
                      <div className="absolute left-[-9px] top-0 bg-primary text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                        1
                      </div>
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Criação do Release
                      </h3>
                      <p className="text-muted-foreground">
                        A primeira etapa é criar seu release utilizando nosso editor especializado:
                      </p>
                      <ol className="list-decimal pl-5 mt-2 space-y-2 text-sm text-muted-foreground">
                        <li>Acesse a aba "Assessoria de Imprensa" e depois "Criar Release"</li>
                        <li>Preencha o título e subtítulo do release - eles devem ser impactantes e diretos</li>
                        <li>Escreva o conteúdo do release, seguindo as boas práticas jornalísticas (responda: quem, o quê, quando, onde, como e por quê)</li>
                        <li>Adicione citações relevantes de especialistas ou porta-vozes da organização</li>
                        <li>Inclua links para materiais complementares (fotos, vídeos, estudos)</li>
                        <li>Selecione os veículos-alvo para distribuição</li>
                        <li>Clique em "Enviar para Aprovação" quando finalizar</li>
                      </ol>
                    </div>
                    
                    <div className="relative pl-8 pb-8 border-l-2 border-gray-200">
                      <div className="absolute left-[-9px] top-0 bg-gray-300 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                        2
                      </div>
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Eye className="h-5 w-5 text-gray-500" />
                        Revisão do Conteúdo
                      </h3>
                      <p className="text-muted-foreground">
                        Depois de enviar, seu release passa por um processo de revisão:
                      </p>
                      <ol className="list-decimal pl-5 mt-2 space-y-2 text-sm text-muted-foreground">
                        <li>Nossa equipe de jornalistas especializados analisa o conteúdo</li>
                        <li>Verificamos a aderência às boas práticas jornalísticas</li>
                        <li>Avaliamos a relevância para os veículos selecionados</li>
                        <li>Sugerimos ajustes quando necessário</li>
                        <li>Você recebe notificações sobre o status da revisão</li>
                        <li>Se houver sugestões, você pode editar e reenviar o release</li>
                      </ol>
                    </div>
                    
                    <div className="relative pl-8 pb-8 border-l-2 border-gray-200">
                      <div className="absolute left-[-9px] top-0 bg-gray-300 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                        3
                      </div>
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-gray-500" />
                        Aprovação
                      </h3>
                      <p className="text-muted-foreground">
                        O processo de aprovação é crucial para garantir a qualidade:
                      </p>
                      <ol className="list-decimal pl-5 mt-2 space-y-2 text-sm text-muted-foreground">
                        <li>Releases revisados passam para a fase de aprovação</li>
                        <li>Nossa equipe editorial avalia a adequação aos veículos-alvo</li>
                        <li>Verificamos a precisão de todos os dados e informações</li>
                        <li>Fazemos uma última checagem de formatação e estilo</li>
                        <li>Você recebe uma notificação de aprovação ou rejeição</li>
                        <li>Releases aprovados seguem para distribuição</li>
                      </ol>
                    </div>
                    
                    <div className="relative pl-8 pb-8 border-l-2 border-gray-200">
                      <div className="absolute left-[-9px] top-0 bg-gray-300 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                        4
                      </div>
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Send className="h-5 w-5 text-gray-500" />
                        Distribuição
                      </h3>
                      <p className="text-muted-foreground">
                        A fase de distribuição envia seu release para os veículos selecionados:
                      </p>
                      <ol className="list-decimal pl-5 mt-2 space-y-2 text-sm text-muted-foreground">
                        <li>Releases são enviados para nossa base de contatos jornalísticos</li>
                        <li>A distribuição é segmentada por área de interesse e veículos</li>
                        <li>O sistema registra todos os envios realizados</li>
                        <li>Os jornalistas podem acessar materiais complementares via links</li>
                        <li>Confirmamos o recebimento sempre que possível</li>
                        <li>O status muda para "Distribuído" no seu painel</li>
                      </ol>
                    </div>
                    
                    <div className="relative pl-8">
                      <div className="absolute left-[-9px] top-0 bg-gray-300 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                        5
                      </div>
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <LineChart className="h-5 w-5 text-gray-500" />
                        Monitoramento e Relatórios
                      </h3>
                      <p className="text-muted-foreground">
                        Acompanhe o desempenho dos seus releases:
                      </p>
                      <ol className="list-decimal pl-5 mt-2 space-y-2 text-sm text-muted-foreground">
                        <li>Acesse a aba "Acompanhamento" para ver o status de cada release</li>
                        <li>Veja quais veículos publicaram seu conteúdo</li>
                        <li>Acesse links diretos para as publicações</li>
                        <li>Analise estatísticas de desempenho no dashboard</li>
                        <li>Exporte relatórios detalhados por período</li>
                        <li>Compare o desempenho entre diferentes releases</li>
                        <li>Utilize os insights para aprimorar futuras comunicações</li>
                      </ol>
                    </div>
                  </div>
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
