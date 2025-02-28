
export const diarioOficialSpiderCode = `
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
            
            # Tentar extrair palavras-chave do conteúdo
            item['palavras_chave'] = self.extrair_palavras_chave(item['conteudo'])
            
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
    
    def extrair_palavras_chave(self, texto):
        # Método simples para extrair possíveis palavras-chave
        # Em uma implementação real, usaríamos NLP mais avançado
        palavras_importantes = [
            'licitação', 'contrato', 'portaria', 'decreto',
            'lei', 'orçamento', 'concurso', 'nomeação'
        ]
        encontradas = []
        for palavra in palavras_importantes:
            if re.search(r'\\b' + palavra + r'\\b', texto.lower()):
                encontradas.append(palavra)
        return encontradas
`;
