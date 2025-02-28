
export const ibgeSpiderCode = `
import scrapy
import json
from observatorio.items import IndicadorSocioeconomicoItem

class IBGESpider(scrapy.Spider):
    name = 'ibge_indicadores'
    allowed_domains = ['api.ibge.gov.br', 'servicodados.ibge.gov.br']
    
    # Lista de APIs e indicadores a serem consultados
    apis = [
        {
            'url': 'https://servicodados.ibge.gov.br/api/v1/pesquisas/indicadores/1419',
            'indicador': 'PIB',
            'descricao': 'Produto Interno Bruto'
        },
        {
            'url': 'https://servicodados.ibge.gov.br/api/v1/pesquisas/indicadores/28141',
            'indicador': 'IPCA',
            'descricao': 'Índice Nacional de Preços ao Consumidor Amplo'
        }
    ]
    
    def start_requests(self):
        # Iniciar requisições para cada API definida
        for api in self.apis:
            yield scrapy.Request(
                url=api['url'],
                callback=self.parse,
                meta={'api_info': api}
            )
    
    def parse(self, response):
        api_info = response.meta['api_info']
        
        # Processar resposta JSON da API
        try:
            dados = json.loads(response.text)
            
            # Iterar pelos resultados (cada indicador pode ter múltiplos períodos/localidades)
            for resultado in dados:
                nome_indicador = resultado.get('indicador', api_info['indicador'])
                
                # Extrair séries históricas
                series = resultado.get('series', [{}])[0]
                localidades = series.get('localidade', {})
                
                # Para cada localidade, extrair valores e datas
                for localidade_id, valores in localidades.items():
                    for data, valor in valores.items():
                        item = IndicadorSocioeconomicoItem()
                        item['indicador'] = nome_indicador
                        item['descricao'] = api_info['descricao']
                        item['localidade_id'] = localidade_id
                        item['data_referencia'] = data
                        item['valor'] = valor.get('v') if isinstance(valor, dict) else valor
                        item['unidade'] = resultado.get('unidade', {}).get('id')
                        item['fonte'] = 'IBGE'
                        
                        yield item
                        
        except json.JSONDecodeError:
            self.logger.error(f"Erro ao processar JSON da API: {api_info['url']}")
        except Exception as e:
            self.logger.error(f"Erro ao processar dados: {str(e)}")
`;
