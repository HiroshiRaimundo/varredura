
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { CheckCircle, Info } from "lucide-react";

const BestPractices: React.FC = () => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default BestPractices;
