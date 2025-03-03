interface WebhookConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
  events: string[];
}

interface WebhookEvent {
  id: string;
  type: string;
  timestamp: Date;
  payload: any;
  metadata?: Record<string, any>;
}

interface WebhookDelivery {
  id: string;
  webhookId: string;
  eventId: string;
  timestamp: Date;
  status: 'success' | 'failed' | 'pending' | 'retrying';
  statusCode?: number;
  response?: string;
  error?: string;
  retryCount: number;
}

export class WebhookManager {
  private webhooks: Map<string, WebhookConfig> = new Map();
  private deliveryHistory: WebhookDelivery[] = [];
  private eventQueue: WebhookEvent[] = [];
  private isProcessing = false;

  /**
   * Registra um novo webhook
   */
  registerWebhook(id: string, config: WebhookConfig): void {
    this.webhooks.set(id, {
      ...config,
      timeout: config.timeout || 30000,
      retryAttempts: config.retryAttempts || 3,
      retryDelay: config.retryDelay || 60000
    });
  }

  /**
   * Remove um webhook
   */
  unregisterWebhook(id: string): boolean {
    return this.webhooks.delete(id);
  }

  /**
   * Dispara um evento para todos os webhooks registrados
   */
  async triggerEvent(event: Omit<WebhookEvent, 'id' | 'timestamp'>): Promise<void> {
    const webhookEvent: WebhookEvent = {
      ...event,
      id: this.generateEventId(),
      timestamp: new Date()
    };

    this.eventQueue.push(webhookEvent);

    if (!this.isProcessing) {
      this.processEventQueue();
    }
  }

  /**
   * Processa a fila de eventos
   */
  private async processEventQueue(): Promise<void> {
    if (this.isProcessing || this.eventQueue.length === 0) {
      return;
    }

    this.isProcessing = true;

    try {
      while (this.eventQueue.length > 0) {
        const event = this.eventQueue.shift();
        if (event) {
          await this.deliverEvent(event);
        }
      }
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Entrega um evento para todos os webhooks interessados
   */
  private async deliverEvent(event: WebhookEvent): Promise<void> {
    const interestedWebhooks = Array.from(this.webhooks.entries())
      .filter(([_, config]) => config.events.includes(event.type));

    await Promise.all(
      interestedWebhooks.map(([webhookId, config]) =>
        this.deliverToWebhook(webhookId, config, event)
      )
    );
  }

  /**
   * Entrega um evento para um webhook específico
   */
  private async deliverToWebhook(
    webhookId: string,
    config: WebhookConfig,
    event: WebhookEvent
  ): Promise<void> {
    const delivery: WebhookDelivery = {
      id: this.generateDeliveryId(),
      webhookId,
      eventId: event.id,
      timestamp: new Date(),
      status: 'pending',
      retryCount: 0
    };

    this.deliveryHistory.push(delivery);

    for (let attempt = 0; attempt <= config.retryAttempts!; attempt++) {
      if (attempt > 0) {
        delivery.status = 'retrying';
        delivery.retryCount = attempt;
        await this.delay(config.retryDelay!);
      }

      try {
        const response = await this.makeRequest(config, event);
        
        delivery.status = 'success';
        delivery.statusCode = response.status;
        delivery.response = JSON.stringify(response.data);
        break;

      } catch (error) {
        delivery.status = 'failed';
        delivery.error = error.message;
        
        if (attempt === config.retryAttempts!) {
          console.error(`Webhook delivery failed after ${attempt} attempts:`, error);
        }
      }
    }
  }

  /**
   * Faz uma requisição HTTP para o webhook
   */
  private async makeRequest(config: WebhookConfig, event: WebhookEvent): Promise<any> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout);

    try {
      const response = await fetch(config.url, {
        method: config.method,
        headers: {
          'Content-Type': 'application/json',
          ...config.headers
        },
        body: JSON.stringify({
          event_type: event.type,
          event_id: event.id,
          timestamp: event.timestamp,
          payload: event.payload,
          metadata: event.metadata
        }),
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return {
        status: response.status,
        data: await response.json()
      };

    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Retorna o histórico de entregas
   */
  getDeliveryHistory(filters?: {
    webhookId?: string;
    eventType?: string;
    status?: WebhookDelivery['status'];
    startDate?: Date;
    endDate?: Date;
  }): WebhookDelivery[] {
    let filtered = this.deliveryHistory;

    if (filters) {
      filtered = filtered.filter(delivery => {
        if (filters.webhookId && delivery.webhookId !== filters.webhookId) {
          return false;
        }

        if (filters.status && delivery.status !== filters.status) {
          return false;
        }

        if (filters.startDate && delivery.timestamp < filters.startDate) {
          return false;
        }

        if (filters.endDate && delivery.timestamp > filters.endDate) {
          return false;
        }

        return true;
      });
    }

    return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  /**
   * Retorna estatísticas de entrega
   */
  getDeliveryStats(webhookId?: string): {
    total: number;
    success: number;
    failed: number;
    pending: number;
    retrying: number;
    averageResponseTime?: number;
  } {
    const deliveries = webhookId
      ? this.deliveryHistory.filter(d => d.webhookId === webhookId)
      : this.deliveryHistory;

    const stats = {
      total: deliveries.length,
      success: 0,
      failed: 0,
      pending: 0,
      retrying: 0,
      averageResponseTime: 0
    };

    let totalResponseTime = 0;
    let successfulDeliveries = 0;

    deliveries.forEach(delivery => {
      stats[delivery.status]++;

      if (delivery.status === 'success' && delivery.timestamp) {
        const responseTime = new Date(delivery.timestamp).getTime() - 
          new Date(delivery.timestamp).getTime();
        totalResponseTime += responseTime;
        successfulDeliveries++;
      }
    });

    if (successfulDeliveries > 0) {
      stats.averageResponseTime = totalResponseTime / successfulDeliveries;
    }

    return stats;
  }

  /**
   * Utilitários
   */
  private generateEventId(): string {
    return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateDeliveryId(): string {
    return `dlv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
} 