import json
from datetime import datetime

class KogaMonitorPipeline:
    def __init__(self):
        self.file = None
        
    def open_spider(self, spider):
        filename = f'data_{spider.name}_{datetime.now().strftime("%Y%m%d")}.json'
        self.file = open(filename, 'w', encoding='utf-8')
        
    def close_spider(self, spider):
        if self.file:
            self.file.close()
            
    def process_item(self, item, spider):
        # Processa e limpa os dados
        if isinstance(item.get('content'), list):
            item['content'] = ' '.join(item['content'])
            
        # Salva no arquivo
        line = json.dumps(dict(item), ensure_ascii=False) + "\n"
        self.file.write(line)
        return item
