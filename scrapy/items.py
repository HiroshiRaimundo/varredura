from scrapy import Item, Field
from itemloaders.processors import TakeFirst, Join, MapCompose
from datetime import datetime

class GovernoItem(Item):
    """
    Item estruturado para dados do governo
    Inclui processadores para limpeza e normalização dos dados
    """
    url = Field(
        output_processor=TakeFirst()
    )
    title = Field(
        input_processor=MapCompose(str.strip),
        output_processor=TakeFirst()
    )
    date = Field(
        output_processor=TakeFirst()
    )
    content = Field(
        input_processor=MapCompose(str.strip, lambda x: x.replace('\n', ' ')),
        output_processor=Join(' ')
    )
    metadata = Field()
    links = Field(
        input_processor=MapCompose(str.strip),
        output_processor=lambda x: list(set(x))  # Remove duplicatas
    )
    headings = Field(
        input_processor=MapCompose(str.strip),
        output_processor=list
    )
    tables = Field()
    emails = Field(
        input_processor=MapCompose(
            str.strip,
            lambda x: x.replace('mailto:', '')
        ),
        output_processor=lambda x: list(set(x))
    )
    phones = Field(
        input_processor=MapCompose(
            str.strip,
            lambda x: x.replace('tel:', '')
        ),
        output_processor=lambda x: list(set(x))
    )
