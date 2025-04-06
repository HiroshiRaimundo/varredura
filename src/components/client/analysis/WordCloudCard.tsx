
import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CircleOff } from "lucide-react";

interface WordCloudCardProps {
  title?: string;
  description?: string;
  words?: Array<{ text: string, value: number }>;
  loading?: boolean;
}

const DEFAULT_WORDS = [
  { text: 'monitoramento', value: 25 },
  { text: 'análise', value: 18 },
  { text: 'dados', value: 30 },
  { text: 'dashboard', value: 20 },
  { text: 'insights', value: 15 },
  { text: 'mídia', value: 22 },
  { text: 'releases', value: 28 },
  { text: 'legislação', value: 16 },
  { text: 'alertas', value: 13 },
  { text: 'sentimento', value: 21 },
  { text: 'notícias', value: 24 },
  { text: 'política', value: 17 },
  { text: 'ambiente', value: 19 },
  { text: 'sustentabilidade', value: 14 },
  { text: 'tecnologia', value: 12 }
];

const WordCloudCard: React.FC<WordCloudCardProps> = ({
  title = "Nuvem de Palavras",
  description = "Palavras mais frequentes nos releases e menções",
  words = DEFAULT_WORDS,
  loading = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 300, height: 200 });

  // Função para gerar um valor de cor HSL aleatório com saturação consistente
  const getRandomColor = (index: number) => {
    const hue = (210 + index * 20) % 360; // Azul girando pelo círculo de cores
    return `hsl(${hue}, 70%, 60%)`;
  };

  // Redimensionar o canvas quando o tamanho do contêiner mudar
  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setCanvasSize({
          width: width,
          height: Math.max(200, height - 40) // subtrai margem para headers
        });
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  // Função para verificar sobreposição de palavras
  const checkOverlap = (
    word: { x: number, y: number, width: number, height: number }, 
    placedWords: Array<{ x: number, y: number, width: number, height: number }>
  ) => {
    for (const placedWord of placedWords) {
      if (
        word.x < placedWord.x + placedWord.width &&
        word.x + word.width > placedWord.x &&
        word.y < placedWord.y + placedWord.height &&
        word.y + word.height > placedWord.y
      ) {
        return true; // Sobreposição detectada
      }
    }
    return false; // Sem sobreposição
  };

  // Desenhar a nuvem de palavras no canvas
  useEffect(() => {
    if (!canvasRef.current || !words.length || loading) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    
    // Configuração inicial do canvas
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Normalizar valores para melhor visualização
    const maxValue = Math.max(...words.map(word => word.value));
    const minValue = Math.min(...words.map(word => word.value));
    const range = maxValue - minValue;
    
    // Armazenar palavras já posicionadas para evitar sobreposição
    const placedWords: Array<{ x: number, y: number, width: number, height: number }> = [];
    
    // Tamanho da fonte mínimo e máximo
    const minFontSize = 10;
    const maxFontSize = 36;
    
    // Ordenar palavras por valor (mais frequentes primeiro)
    const sortedWords = [...words].sort((a, b) => b.value - a.value);
    
    // Desenhar cada palavra
    for (let i = 0; i < sortedWords.length; i++) {
      const word = sortedWords[i];
      const normalizedValue = range === 0 ? 0.5 : (word.value - minValue) / range;
      const fontSize = minFontSize + normalizedValue * (maxFontSize - minFontSize);
      
      ctx.font = `${fontSize}px Arial, sans-serif`;
      ctx.fillStyle = getRandomColor(i);
      
      // Calcular dimensões do texto
      const textMetrics = ctx.measureText(word.text);
      const textWidth = textMetrics.width;
      const textHeight = fontSize;
      
      // Número máximo de tentativas para posicionar a palavra sem sobreposição
      const maxAttempts = 100;
      let placed = false;
      
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        // Gerar posição aleatória (com margem para evitar cortes)
        const x = Math.random() * (canvasSize.width - textWidth) + textWidth/2;
        const y = Math.random() * (canvasSize.height - textHeight) + textHeight/2;
        
        const wordObj = {
          x: x - textWidth/2,
          y: y - textHeight/2,
          width: textWidth,
          height: textHeight
        };
        
        // Verificar sobreposição
        if (!checkOverlap(wordObj, placedWords)) {
          ctx.fillText(word.text, x, y);
          placedWords.push(wordObj);
          placed = true;
          break;
        }
      }
      
      // Se não conseguiu posicionar após todas as tentativas, força a posição
      if (!placed) {
        const x = Math.random() * (canvasSize.width - textWidth) + textWidth/2;
        const y = Math.random() * (canvasSize.height - textHeight) + textHeight/2;
        ctx.fillText(word.text, x, y);
      }
    }
  }, [words, canvasSize, loading]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent ref={containerRef} className="min-h-[300px] flex items-center justify-center">
        {loading ? (
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <CircleOff className="h-12 w-12 mb-2" />
            <p>Carregando dados...</p>
          </div>
        ) : (
          <canvas 
            ref={canvasRef} 
            width={canvasSize.width} 
            height={canvasSize.height}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default WordCloudCard;
