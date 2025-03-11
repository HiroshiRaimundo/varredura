/**
 * Configuração da API
 * 
 * Este arquivo permite configurar o comportamento da API:
 * - USE_MOCK_DATA: Se true, usa dados mockados em vez de fazer chamadas reais à API
 * - API_BASE_URL: URL base para chamadas à API (usado apenas quando USE_MOCK_DATA é false)
 * - MOCK_DELAY_MS: Atraso simulado para chamadas mockadas (para simular latência de rede)
 */

export const API_CONFIG = {
  USE_MOCK_DATA: true,  // Altere para false para usar a API real
  API_BASE_URL: 'https://xzowroybszlvbkgzurla.supabase.co',
  MOCK_DELAY_MS: 500,   // Atraso simulado em milissegundos
};

/**
 * Função utilitária para simular um atraso de rede
 * Útil para testes e desenvolvimento local
 */
export const simulateNetworkDelay = async (): Promise<void> => {
  if (API_CONFIG.USE_MOCK_DATA) {
    return new Promise(resolve => setTimeout(resolve, API_CONFIG.MOCK_DELAY_MS));
  }
  return Promise.resolve();
};
