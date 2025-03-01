
import React from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQ: React.FC = () => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default FAQ;
