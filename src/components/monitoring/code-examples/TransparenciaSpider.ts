
export const transparenciaSpiderCode = `
import scrapy
from observatorio.items import DespesaPublicaItem

class PortalTransparenciaSpider(scrapy.Spider):
    name = 'portal_transparencia'
    allowed_domains = ['portaltransparencia.gov.br']
    start_urls = ['http://www.portaltransparencia.gov.br/despesas']
    
    def parse(self, response):
        # Encontrar todas as linhas de despesas na tabela
        for linha in response.css('table.listagem tbody tr'):
            despesa = DespesaPublicaItem()
            
            # Extrair dados de cada coluna
            despesa['orgao'] = linha.css('td:nth-child(1)::text').get()
            despesa['acao'] = linha.css('td:nth-child(2)::text').get()
            despesa['programa'] = linha.css('td:nth-child(3)::text').get()
            despesa['valor_empenhado'] = self.parse_valor(linha.css('td:nth-child(4)::text').get())
            despesa['valor_liquidado'] = self.parse_valor(linha.css('td:nth-child(5)::text').get())
            despesa['data_atualizacao'] = self.parse_data(linha.css('td:nth-child(6)::text').get())
            
            # Enviar o item para processamento
            yield despesa
            
        # Paginação - ir para a próxima página se existir
        next_page = response.css('a.next-page::attr(href)').get()
        if next_page:
            yield response.follow(next_page, self.parse)
    
    def parse_valor(self, valor_texto):
        # Converter texto "R$ 1.234.567,89" para float 1234567.89
        if not valor_texto:
            return 0.0
        return float(valor_texto.replace('R$', '').replace('.', '').replace(',', '.').strip())
    
    def parse_data(self, data_texto):
        # Converter formato de data brasileira para ISO
        if not data_texto:
            return None
        # Exemplo simplificado, podem ser necessários ajustes conforme o formato
        dia, mes, ano = data_texto.split('/')
        return f"{ano}-{mes}-{dia}"
`;
