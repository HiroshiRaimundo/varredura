from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base
import os

# Configuração do banco de dados
DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://superset:superset@postgres:5432/superset')

def init_db():
    # Criar engine
    engine = create_engine(DATABASE_URL)
    
    # Criar todas as tabelas
    Base.metadata.create_all(engine)
    
    # Criar sessão
    Session = sessionmaker(bind=engine)
    return Session()

if __name__ == '__main__':
    session = init_db()
    print("Banco de dados inicializado com sucesso!")
