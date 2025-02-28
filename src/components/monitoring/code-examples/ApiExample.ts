
export const apiExampleCode = `
import axios from 'axios';

// Configuração da API para monitoramento
const API_URL = "https://api.exemplo.com/dados";
const API_KEY = process.env.API_KEY; // Chave armazenada em variável de ambiente

// Função para buscar dados da API
async function fetchApiData() {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': \`Bearer \${API_KEY}\`,
        'Content-Type': 'application/json'
      },
      params: {
        region: 'amapa',
        from_date: '2023-01-01',
        to_date: '2023-12-31'
      }
    });
    
    // Processar os dados recebidos
    const data = response.data;
    console.log('Dados obtidos com sucesso:', data);
    
    // Salvar os dados processados
    await saveDataToDatabase(data);
    
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    throw error;
  }
}

// Função para salvar os dados em banco
async function saveDataToDatabase(data) {
  // Implementação do armazenamento dos dados
  // Pode usar PostgreSQL, MongoDB, etc.
  console.log('Salvando dados no banco...');
}

// Agendamento da execução do monitoramento
const schedule = require('node-schedule');

// Executa todos os dias às 3:00 da manhã
schedule.scheduleJob('0 3 * * *', async () => {
  console.log('Iniciando coleta de dados agendada...');
  try {
    await fetchApiData();
    console.log('Coleta de dados concluída com sucesso!');
  } catch (err) {
    console.error('Erro na coleta agendada:', err);
  }
});
`;
