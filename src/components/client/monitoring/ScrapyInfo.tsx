
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, FileCode, Search, Database } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ScrapyInfoProps {
  onClose: () => void;
}

const ScrapyInfo: React.FC<ScrapyInfoProps> = ({ onClose }) => {
  const diarioOficialCode = `
import scrapy
import re
from datetime import datetime
from observatorio.items import DiarioOficialItem

class DiarioOficialSpider(scrapy.Spider):
    name = 'diario_oficial'
    allowed_domains = ['in.gov.br']
    start_urls = ['https://www.in.gov.br/leiturajornal']
    
    def parse(self, response):
        # Encontrar todas as edições disponíveis
        for edicao in response.css('div.edicao-container'):
            data_texto = edicao.css('span.data-edicao::text').get()
            
            # Extrair links para as seções do diário
            for secao in edicao.css('a.link-secao'):
                item = DiarioOficialItem()
                item['data_publicacao'] = self.parse_data(data_texto)
                item['secao'] = secao.css('::text').get().strip()
                item['url'] = secao.css('::attr(href)').get()
                
                # Seguir o link para extrair o conteúdo da seção
                yield response.follow(
                    item['url'], 
                    self.parse_secao, 
                    meta={'item': item}
                )
    
    def parse_secao(self, response):
        item = response.meta['item']
        
        # Extrair todas as publicações da seção
        for publicacao in response.css('div.publicacao-container'):
            item['titulo'] = publicacao.css('h2.titulo-publicacao::text').get()
            item['orgao'] = publicacao.css('span.orgao::text').get()
            item['conteudo'] = "\\n".join(publicacao.css('div.texto-dou ::text').getall())
            
            # Baixar PDFs quando disponíveis
            pdf_links = publicacao.css('a[href$=".pdf"]::attr(href)').getall()
            item['pdfs'] = pdf_links
            
            # Extrair termos de busca do conteúdo
            item['termos_encontrados'] = self.extrair_termos_monitorados(item['conteudo'])
            
            yield item
    
    def parse_data(self, data_texto):
        # Converter formato "DD/MM/YYYY" para ISO
        if not data_texto:
            return None
        match = re.search(r'(\\d{2})/(\\d{2})/(\\d{4})', data_texto)
        if match:
            dia, mes, ano = match.groups()
            return f"{ano}-{mes}-{dia}"
        return None
    
    def extrair_termos_monitorados(self, texto):
        # Lista de termos definidos no monitoramento
        termos_monitorados = self.settings.get('TERMOS_MONITORADOS', [])
        encontrados = []
        
        if not texto or not termos_monitorados:
            return encontrados
            
        texto_lower = texto.lower()
        for termo in termos_monitorados:
            # Verificar termo exato entre aspas
            if termo.startswith('"') and termo.endswith('"'):
                termo_limpo = termo[1:-1].lower()
                if termo_limpo in texto_lower:
                    encontrados.append(termo_limpo)
            # Verificar qualquer ocorrência do termo
            elif termo.lower() in texto_lower:
                encontrados.append(termo.lower())
                
        return encontrados
`;

  const pdfDownloaderCode = `
import scrapy
import os
from scrapy.http import Request
from pathlib import Path

class PDFDownloaderPipeline:
    """Pipeline para baixar PDFs encontrados durante o monitoramento"""
    
    def __init__(self, pdf_dir):
        self.pdf_dir = pdf_dir
        # Criar diretório se não existir
        Path(self.pdf_dir).mkdir(parents=True, exist_ok=True)
    
    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            pdf_dir=crawler.settings.get('PDF_FILES_DIR', 'downloads/pdfs')
        )
    
    def process_item(self, item, spider):
        if 'pdfs' in item and item['pdfs']:
            for pdf_url in item['pdfs']:
                # Extrair nome do arquivo da URL
                filename = pdf_url.split('/')[-1]
                file_path = os.path.join(self.pdf_dir, filename)
                
                # Registrar download para processamento posterior
                spider.crawler.engine.download(
                    Request(
                        url=pdf_url,
                        meta={'file_path': file_path}
                    ),
                    spider
                )
                
                # Adicionar caminho do arquivo ao item
                if 'arquivos_baixados' not in item:
                    item['arquivos_baixados'] = []
                item['arquivos_baixados'].append(file_path)
                
        return item
`;

  const textExtractionCode = `
import PyPDF2
import os
import docx
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

# Garantir que temos os recursos necessários do NLTK
nltk.download('punkt')
nltk.download('stopwords')

class DocumentTextExtractor:
    """Classe para extrair texto de diferentes tipos de documentos"""
    
    def __init__(self):
        self.stopwords = set(stopwords.words('portuguese'))
    
    def extract_text_from_pdf(self, pdf_path):
        """Extrai texto de um arquivo PDF"""
        text = ""
        try:
            with open(pdf_path, 'rb') as file:
                reader = PyPDF2.PdfReader(file)
                for page_num in range(len(reader.pages)):
                    page = reader.pages[page_num]
                    text += page.extract_text() + "\\n"
        except Exception as e:
            print(f"Erro ao extrair texto do PDF {pdf_path}: {e}")
        return text
    
    def extract_text_from_docx(self, docx_path):
        """Extrai texto de um arquivo DOCX"""
        text = ""
        try:
            doc = docx.Document(docx_path)
            for para in doc.paragraphs:
                text += para.text + "\\n"
        except Exception as e:
            print(f"Erro ao extrair texto do DOCX {docx_path}: {e}")
        return text
    
    def extract_keywords(self, text, num_keywords=10):
        """Extrai palavras-chave do texto"""
        words = word_tokenize(text.lower())
        # Remover stopwords e pontuação
        words = [word for word in words if word.isalnum() and word not in self.stopwords]
        
        # Contar frequência
        freq_dist = nltk.FreqDist(words)
        return freq_dist.most_common(num_keywords)
    
    def process_document(self, file_path):
        """Processa um documento baseado em sua extensão"""
        _, ext = os.path.splitext(file_path)
        
        if ext.lower() == '.pdf':
            text = self.extract_text_from_pdf(file_path)
        elif ext.lower() == '.docx':
            text = self.extract_text_from_docx(file_path)
        else:
            text = ""
            print(f"Formato de arquivo não suportado: {ext}")
            
        if text:
            keywords = self.extract_keywords(text)
            return {
                'file_path': file_path,
                'text': text,
                'keywords': keywords
            }
        return None
`;

  const sentimentAnalysisCode = `
from transformers import pipeline, AutoTokenizer, AutoModelForSequenceClassification
import pandas as pd
import numpy as np

class TextAnalyzer:
    """Classe para análise de textos extraídos dos documentos"""
    
    def __init__(self):
        # Carregar modelo pré-treinado para análise de sentimento em português
        model_name = "neuralmind/bert-base-portuguese-cased"
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForSequenceClassification.from_pretrained(model_name)
        self.sentiment_analyzer = pipeline("sentiment-analysis", model=self.model, tokenizer=self.tokenizer)
        
    def analyze_sentiment(self, text):
        """Analisa o sentimento do texto"""
        # Dividir texto em blocos para processamento (limite de tokens)
        max_length = 512
        text_blocks = [text[i:i+max_length] for i in range(0, len(text), max_length)]
        
        results = []
        for block in text_blocks:
            if block.strip():  # Ignorar blocos vazios
                try:
                    result = self.sentiment_analyzer(block)
                    results.extend(result)
                except Exception as e:
                    print(f"Erro na análise de sentimento: {e}")
        
        # Calcular média dos sentimentos
        if results:
            # Extrair scores e normalizar
            scores = [r['score'] * (1 if r['label'] == 'POSITIVE' else -1) for r in results]
            avg_score = np.mean(scores)
            
            # Mapear para categorias
            if avg_score > 0.2:
                return "positivo", avg_score
            elif avg_score < -0.2:
                return "negativo", avg_score
            else:
                return "neutro", avg_score
        
        return "neutro", 0.0
    
    def extract_entities(self, text):
        """Extrai entidades do texto"""
        # Implementação simplificada - em um sistema real usaria NER
        # Retorna palavras que começam com maiúscula como possíveis entidades
        words = text.split()
        entities = [word for word in words if word and word[0].isupper()]
        return list(set(entities))  # Remove duplicatas
    
    def get_document_analysis(self, doc_data):
        """Realiza análise completa do documento"""
        if not doc_data or 'text' not in doc_data:
            return None
            
        text = doc_data['text']
        sentiment, score = self.analyze_sentiment(text)
        entities = self.extract_entities(text)
        
        return {
            'file_path': doc_data['file_path'],
            'sentiment': sentiment,
            'sentiment_score': score,
            'entities': entities,
            'keywords': doc_data.get('keywords', [])
        }
`;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Monitoramento Avançado com Scrapy</CardTitle>
        <CardDescription>
          Nosso sistema utiliza Scrapy para monitorar e analisar fontes, incluindo diários oficiais e documentos PDF
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="diario">
          <TabsList className="mb-4">
            <TabsTrigger value="diario">
              <FileText className="h-4 w-4 mr-2" />
              Diário Oficial
            </TabsTrigger>
            <TabsTrigger value="pdf">
              <FileCode className="h-4 w-4 mr-2" />
              Extração de PDFs
            </TabsTrigger>
            <TabsTrigger value="text">
              <Search className="h-4 w-4 mr-2" />
              Análise de Texto
            </TabsTrigger>
            <TabsTrigger value="sentiment">
              <Database className="h-4 w-4 mr-2" />
              Análise de Sentimento
            </TabsTrigger>
          </TabsList>

          <TabsContent value="diario">
            <p className="text-sm text-muted-foreground mb-4">
              O spider abaixo monitora o Diário Oficial da União, extrai o texto das publicações e verifica os termos definidos no monitoramento:
            </p>
            <div className="border rounded-md">
              <SyntaxHighlighter 
                language="python" 
                style={vscDarkPlus}
                showLineNumbers
                customStyle={{ 
                  margin: 0, 
                  borderRadius: '0.375rem',
                  fontSize: '0.8rem' 
                }}
              >
                {diarioOficialCode.trim()}
              </SyntaxHighlighter>
            </div>
          </TabsContent>
          
          <TabsContent value="pdf">
            <p className="text-sm text-muted-foreground mb-4">
              Pipeline para download de PDFs encontrados durante o monitoramento:
            </p>
            <div className="border rounded-md">
              <SyntaxHighlighter 
                language="python" 
                style={vscDarkPlus}
                showLineNumbers
                customStyle={{ 
                  margin: 0, 
                  borderRadius: '0.375rem',
                  fontSize: '0.8rem' 
                }}
              >
                {pdfDownloaderCode.trim()}
              </SyntaxHighlighter>
            </div>
          </TabsContent>
          
          <TabsContent value="text">
            <p className="text-sm text-muted-foreground mb-4">
              Classe para extrair texto de PDFs e DOCXs, e identificar palavras-chave:
            </p>
            <div className="border rounded-md">
              <SyntaxHighlighter 
                language="python" 
                style={vscDarkPlus}
                showLineNumbers
                customStyle={{ 
                  margin: 0, 
                  borderRadius: '0.375rem',
                  fontSize: '0.8rem' 
                }}
              >
                {textExtractionCode.trim()}
              </SyntaxHighlighter>
            </div>
          </TabsContent>
          
          <TabsContent value="sentiment">
            <p className="text-sm text-muted-foreground mb-4">
              Analisador de sentimento e entidades para textos extraídos:
            </p>
            <div className="border rounded-md">
              <SyntaxHighlighter 
                language="python" 
                style={vscDarkPlus}
                showLineNumbers
                customStyle={{ 
                  margin: 0, 
                  borderRadius: '0.375rem',
                  fontSize: '0.8rem' 
                }}
              >
                {sentimentAnalysisCode.trim()}
              </SyntaxHighlighter>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ScrapyInfo;
