interface CacheConfig {
  maxAge: number; // Tempo máximo em segundos que um item pode ficar no cache
  maxSize: number; // Número máximo de itens no cache
  cleanupInterval: number; // Intervalo em segundos para limpeza do cache
}

interface CacheItem<T> {
  data: T;
  timestamp: number;
  key: string;
  tags?: string[];
}

export class QueryCache {
  private cache: Map<string, CacheItem<any>>;
  private config: CacheConfig;
  private cleanupTimer: NodeJS.Timeout | null;

  constructor(config: Partial<CacheConfig> = {}) {
    this.cache = new Map();
    this.config = {
      maxAge: config.maxAge || 3600, // 1 hora por padrão
      maxSize: config.maxSize || 1000,
      cleanupInterval: config.cleanupInterval || 300 // 5 minutos por padrão
    };
    this.cleanupTimer = null;
    this.startCleanup();
  }

  /**
   * Gera uma chave única para a consulta
   */
  private generateKey(query: string, params?: Record<string, any>): string {
    const paramsString = params ? JSON.stringify(params) : '';
    return `${query}:${paramsString}`;
  }

  /**
   * Armazena um item no cache
   */
  set<T>(query: string, data: T, params?: Record<string, any>, tags?: string[]): void {
    const key = this.generateKey(query, params);
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      key,
      tags
    };

    // Se o cache estiver cheio, remove o item mais antigo
    if (this.cache.size >= this.config.maxSize) {
      let oldestKey = '';
      let oldestTime = Infinity;
      
      this.cache.forEach((item, key) => {
        if (item.timestamp < oldestTime) {
          oldestTime = item.timestamp;
          oldestKey = key;
        }
      });

      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, item);
  }

  /**
   * Recupera um item do cache
   */
  get<T>(query: string, params?: Record<string, any>): T | null {
    const key = this.generateKey(query, params);
    const item = this.cache.get(key) as CacheItem<T>;

    if (!item) {
      return null;
    }

    // Verifica se o item expirou
    if (Date.now() - item.timestamp > this.config.maxAge * 1000) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  /**
   * Invalida itens do cache por tags
   */
  invalidateByTags(tags: string[]): void {
    this.cache.forEach((item, key) => {
      if (item.tags && item.tags.some(tag => tags.includes(tag))) {
        this.cache.delete(key);
      }
    });
  }

  /**
   * Invalida um item específico do cache
   */
  invalidate(query: string, params?: Record<string, any>): void {
    const key = this.generateKey(query, params);
    this.cache.delete(key);
  }

  /**
   * Limpa todo o cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Inicia o processo de limpeza automática
   */
  private startCleanup(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }

    this.cleanupTimer = setInterval(() => {
      const now = Date.now();
      this.cache.forEach((item, key) => {
        if (now - item.timestamp > this.config.maxAge * 1000) {
          this.cache.delete(key);
        }
      });
    }, this.config.cleanupInterval * 1000);
  }

  /**
   * Para o processo de limpeza automática
   */
  stopCleanup(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }
  }

  /**
   * Retorna estatísticas do cache
   */
  getStats() {
    const now = Date.now();
    let activeItems = 0;
    let expiredItems = 0;

    this.cache.forEach(item => {
      if (now - item.timestamp <= this.config.maxAge * 1000) {
        activeItems++;
      } else {
        expiredItems++;
      }
    });

    return {
      totalItems: this.cache.size,
      activeItems,
      expiredItems,
      maxSize: this.config.maxSize,
      maxAge: this.config.maxAge,
      cleanupInterval: this.config.cleanupInterval
    };
  }
}

// Exemplo de uso:
/*
const queryCache = new QueryCache({
  maxAge: 3600,        // 1 hora
  maxSize: 1000,       // 1000 itens
  cleanupInterval: 300 // 5 minutos
});

// Armazenar resultado de uma consulta
queryCache.set(
  'SELECT * FROM users WHERE status = ?',
  users,
  { status: 'active' },
  ['users', 'active']
);

// Recuperar resultado do cache
const cachedUsers = queryCache.get(
  'SELECT * FROM users WHERE status = ?',
  { status: 'active' }
);

// Invalidar cache por tags
queryCache.invalidateByTags(['users']);

// Obter estatísticas
const stats = queryCache.getStats();
*/ 