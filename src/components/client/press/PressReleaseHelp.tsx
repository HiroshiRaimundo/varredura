
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const PressReleaseHelp: React.FC = () => {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Como produzir um release eficaz</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] rounded-md border p-4">
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-bold mb-2">O que é um release?</h3>
              <p>
                Um release de imprensa é um comunicado oficial enviado para jornalistas e veículos 
                de comunicação com o objetivo de divulgar informações relevantes sobre uma organização, 
                evento, produto ou serviço.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">Elementos fundamentais de um bom release</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Título atraente:</strong> Deve captar a atenção imediatamente e resumir 
                  o conteúdo principal da notícia.
                </li>
                <li>
                  <strong>Subtítulo complementar:</strong> Adiciona informações ao título e aumenta 
                  o interesse pela leitura completa.
                </li>
                <li>
                  <strong>Primeiro parágrafo impactante:</strong> Deve responder às perguntas essenciais: 
                  o quê, quem, quando, onde, como e por quê.
                </li>
                <li>
                  <strong>Corpo do texto bem estruturado:</strong> Desenvolve a notícia de forma clara 
                  e objetiva, seguindo a técnica da "pirâmide invertida" (do mais para o menos importante).
                </li>
                <li>
                  <strong>Citações relevantes:</strong> Incluir declarações de porta-vozes ou especialistas 
                  adiciona credibilidade à informação.
                </li>
                <li>
                  <strong>Dados e estatísticas:</strong> Números concretos fortalecem a relevância da notícia.
                </li>
                <li>
                  <strong>Material visual:</strong> Imagens, infográficos e vídeos aumentam as chances 
                  de aproveitamento pela imprensa.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">Dicas para escrever um release eficaz</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Seja conciso e objetivo, evitando textos muito longos.</li>
                <li>Use linguagem jornalística e evite termos muito técnicos ou jargões.</li>
                <li>Não abuse de adjetivos ou linguagem promocional excessiva.</li>
                <li>Inclua dados concretos e informações verificáveis.</li>
                <li>Forneça informações de contato para que os jornalistas possam solicitar mais detalhes.</li>
                <li>Revise cuidadosamente para evitar erros gramaticais ou de informação.</li>
                <li>Envie em formato editável, não como PDF ou imagem.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">Estrutura padrão de um release</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>Cabeçalho:</strong> Logo, data e informação de embargo (se aplicável).</li>
                <li><strong>Título:</strong> Claro e atraente, geralmente em negrito.</li>
                <li><strong>Subtítulo:</strong> Complementa o título com informações adicionais.</li>
                <li><strong>Lead (primeiro parágrafo):</strong> Contém as informações essenciais.</li>
                <li><strong>Corpo do texto:</strong> Desenvolve a notícia em ordem decrescente de importância.</li>
                <li><strong>Citações:</strong> Declarações de porta-vozes ou especialistas.</li>
                <li><strong>Materiais complementares:</strong> Links para imagens, vídeos e outros recursos.</li>
                <li><strong>Boilerplate:</strong> Parágrafo padrão com informações sobre a empresa/instituição.</li>
                <li><strong>Contato:</strong> Nome, telefone e e-mail para mais informações.</li>
              </ol>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">Após enviar o release</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Faça follow-up com os jornalistas mais relevantes, mas evite ser insistente.</li>
                <li>Esteja preparado para fornecer informações adicionais rapidamente.</li>
                <li>Monitore a cobertura da mídia e arquive as publicações resultantes.</li>
                <li>Agradeça aos jornalistas que publicaram a notícia.</li>
                <li>Avalie os resultados para melhorar releases futuros.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">Exemplo de release</h3>
              <div className="bg-muted p-4 rounded-md">
                <p className="text-center text-sm text-muted-foreground mb-4">Para divulgação imediata: 15 de junho de 2023</p>
                <h4 className="font-bold text-center mb-2">EMPRESA XYZ LANÇA TECNOLOGIA INOVADORA PARA REDUÇÃO DE EMISSÕES DE CARBONO</h4>
                <p className="text-center italic mb-4">Nova solução promete diminuir em até 40% a pegada de carbono em processos industriais</p>
                <p className="mb-2">
                  São Paulo, 15 de junho de 2023 - A Empresa XYZ, líder em soluções sustentáveis, anunciou hoje o lançamento do "EcoTech+", uma tecnologia revolucionária que promete reduzir em até 40% as emissões de carbono em processos industriais, contribuindo significativamente para os esforços globais de combate às mudanças climáticas.
                </p>
                <p className="mb-2">
                  Desenvolvido após cinco anos de pesquisa e um investimento de R$ 50 milhões, o EcoTech+ utiliza inteligência artificial para otimizar processos de produção, minimizando o desperdício de energia e recursos naturais sem comprometer a eficiência operacional.
                </p>
                <p className="mb-2">
                  "Esta tecnologia representa um avanço significativo em nossa missão de tornar a indústria mais sustentável", afirmou João Silva, CEO da Empresa XYZ. "O EcoTech+ não apenas ajuda as empresas a reduzirem seu impacto ambiental, mas também oferece economia de custos substancial a longo prazo".
                </p>
                <p className="text-sm mt-6">
                  <strong>Sobre a Empresa XYZ:</strong> Fundada em 2005, a Empresa XYZ é pioneira em soluções tecnológicas para sustentabilidade, com presença em mais de 30 países e um compromisso com a inovação responsável.
                </p>
                <p className="text-sm mt-2">
                  <strong>Contato para a imprensa:</strong> Maria Oliveira, Coordenadora de Comunicação | imprensa@empresaxyz.com | (11) 9876-5432
                </p>
              </div>
            </section>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PressReleaseHelp;
