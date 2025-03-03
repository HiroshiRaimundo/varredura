interface TimeSeriesData {
  timestamp: Date;
  value: number;
  metadata?: Record<string, any>;
}

interface AnomalyDetectionConfig {
  sensitivityThreshold: number; // Desvios padrão para considerar anomalia
  minDataPoints: number;       // Mínimo de pontos necessários
  seasonality?: number;        // Período de sazonalidade (opcional)
}

interface PredictionConfig {
  horizon: number;            // Número de períodos para prever
  confidenceInterval: number; // Intervalo de confiança (0-1)
  includeSeasonality: boolean;
}

interface Anomaly {
  timestamp: Date;
  expectedValue: number;
  actualValue: number;
  deviation: number;
  severity: 'low' | 'medium' | 'high';
}

interface Prediction {
  timestamp: Date;
  value: number;
  confidenceLow: number;
  confidenceHigh: number;
  metadata?: Record<string, any>;
}

export class PredictiveAnalytics {
  private historicalData: Map<string, TimeSeriesData[]> = new Map();
  
  /**
   * Adiciona novos dados à série temporal
   */
  addDataPoint(metric: string, value: number, metadata?: Record<string, any>): void {
    const data = this.historicalData.get(metric) || [];
    data.push({
      timestamp: new Date(),
      value,
      metadata
    });
    this.historicalData.set(metric, data);
  }

  /**
   * Detecta anomalias nos dados usando método de desvio padrão móvel
   */
  detectAnomalies(metric: string, config: AnomalyDetectionConfig): Anomaly[] {
    const data = this.historicalData.get(metric) || [];
    if (data.length < config.minDataPoints) {
      return [];
    }

    const anomalies: Anomaly[] = [];
    const windowSize = Math.min(30, Math.floor(data.length / 3));

    for (let i = windowSize; i < data.length; i++) {
      const window = data.slice(i - windowSize, i);
      const values = window.map(d => d.value);
      
      const mean = this.calculateMean(values);
      const stdDev = this.calculateStdDev(values, mean);
      const currentValue = data[i].value;
      const deviation = Math.abs(currentValue - mean) / stdDev;

      if (deviation > config.sensitivityThreshold) {
        anomalies.push({
          timestamp: data[i].timestamp,
          expectedValue: mean,
          actualValue: currentValue,
          deviation,
          severity: this.getAnomalySeverity(deviation)
        });
      }
    }

    return anomalies;
  }

  /**
   * Faz previsões usando modelo de média móvel com sazonalidade
   */
  predict(metric: string, config: PredictionConfig): Prediction[] {
    const data = this.historicalData.get(metric) || [];
    if (data.length < 10) {
      return [];
    }

    const predictions: Prediction[] = [];
    const values = data.map(d => d.value);
    const lastTimestamp = data[data.length - 1].timestamp;

    // Calcula tendência usando regressão linear simples
    const trend = this.calculateTrend(values);
    
    // Calcula padrões sazonais se configurado
    const seasonalFactors = config.includeSeasonality ? 
      this.calculateSeasonality(values) : 
      new Array(values.length).fill(1);

    for (let i = 1; i <= config.horizon; i++) {
      const baseValue = trend.intercept + trend.slope * (values.length + i);
      const seasonalIndex = (values.length + i) % seasonalFactors.length;
      const seasonalFactor = seasonalFactors[seasonalIndex];
      
      const predictedValue = baseValue * seasonalFactor;
      const stdError = this.calculatePredictionError(values, i);
      const confidenceFactor = this.getConfidenceFactor(config.confidenceInterval);

      predictions.push({
        timestamp: new Date(lastTimestamp.getTime() + i * 24 * 60 * 60 * 1000),
        value: predictedValue,
        confidenceLow: predictedValue - confidenceFactor * stdError,
        confidenceHigh: predictedValue + confidenceFactor * stdError
      });
    }

    return predictions;
  }

  /**
   * Calcula a tendência usando regressão linear
   */
  private calculateTrend(values: number[]): { slope: number; intercept: number } {
    const n = values.length;
    const indices = Array.from({ length: n }, (_, i) => i);
    
    const sumX = indices.reduce((a, b) => a + b, 0);
    const sumY = values.reduce((a, b) => a + b, 0);
    const sumXY = indices.reduce((acc, x, i) => acc + x * values[i], 0);
    const sumXX = indices.reduce((acc, x) => acc + x * x, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    return { slope, intercept };
  }

  /**
   * Calcula fatores sazonais
   */
  private calculateSeasonality(values: number[], period: number = 7): number[] {
    const numPeriods = Math.floor(values.length / period);
    if (numPeriods < 2) return new Array(period).fill(1);

    const seasonalValues = new Array(period).fill(0);
    const seasonalCounts = new Array(period).fill(0);

    // Calcula médias por posição no período
    for (let i = 0; i < values.length; i++) {
      const seasonalIndex = i % period;
      seasonalValues[seasonalIndex] += values[i];
      seasonalCounts[seasonalIndex]++;
    }

    // Normaliza os fatores sazonais
    const seasonalFactors = seasonalValues.map((sum, i) => 
      sum / seasonalCounts[i]
    );

    // Normaliza para média 1
    const factorMean = this.calculateMean(seasonalFactors);
    return seasonalFactors.map(factor => factor / factorMean);
  }

  /**
   * Calcula o erro de previsão baseado na distância
   */
  private calculatePredictionError(values: number[], horizon: number): number {
    const errors = [];
    const windowSize = Math.min(30, Math.floor(values.length / 3));

    for (let i = windowSize; i < values.length - horizon; i++) {
      const predicted = values[i];
      const actual = values[i + horizon];
      errors.push(Math.abs(predicted - actual));
    }

    return this.calculateMean(errors);
  }

  /**
   * Utilitários estatísticos
   */
  private calculateMean(values: number[]): number {
    return values.reduce((a, b) => a + b, 0) / values.length;
  }

  private calculateStdDev(values: number[], mean: number): number {
    const squareDiffs = values.map(value => {
      const diff = value - mean;
      return diff * diff;
    });
    
    return Math.sqrt(this.calculateMean(squareDiffs));
  }

  private getConfidenceFactor(confidence: number): number {
    // Aproximação da distribuição normal
    // 90% = 1.645, 95% = 1.96, 99% = 2.576
    const confidenceLevels = {
      0.90: 1.645,
      0.95: 1.96,
      0.99: 2.576
    };
    
    return confidenceLevels[confidence] || 1.96;
  }

  private getAnomalySeverity(deviation: number): 'low' | 'medium' | 'high' {
    if (deviation > 4) return 'high';
    if (deviation > 3) return 'medium';
    return 'low';
  }

  /**
   * Retorna estatísticas resumidas da série temporal
   */
  getMetricStats(metric: string) {
    const data = this.historicalData.get(metric) || [];
    if (data.length === 0) return null;

    const values = data.map(d => d.value);
    const mean = this.calculateMean(values);
    const stdDev = this.calculateStdDev(values, mean);

    return {
      count: values.length,
      mean,
      stdDev,
      min: Math.min(...values),
      max: Math.max(...values),
      firstTimestamp: data[0].timestamp,
      lastTimestamp: data[data.length - 1].timestamp
    };
  }
} 