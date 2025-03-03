import { createReadStream, createWriteStream } from 'fs';
import { mkdir, readdir, stat } from 'fs/promises';
import { join, basename } from 'path';
import { createGzip } from 'zlib';
import { pipeline } from 'stream/promises';

interface BackupConfig {
  backupDir: string;
  retention: {
    daily: number;   // Dias para manter backups diários
    weekly: number;  // Semanas para manter backups semanais
    monthly: number; // Meses para manter backups mensais
  };
  compression: boolean;
  encryptionKey?: string;
}

interface BackupMetadata {
  timestamp: Date;
  type: 'daily' | 'weekly' | 'monthly';
  size: number;
  checksum: string;
  compressed: boolean;
  encrypted: boolean;
  sources: string[];
}

export class BackupManager {
  private config: BackupConfig;
  private backupQueue: Array<{
    source: string;
    type: 'daily' | 'weekly' | 'monthly';
  }> = [];
  private isProcessing = false;

  constructor(config: BackupConfig) {
    this.config = config;
    this.initializeBackupDirectory();
  }

  /**
   * Inicializa o diretório de backup
   */
  private async initializeBackupDirectory(): Promise<void> {
    try {
      await mkdir(this.config.backupDir, { recursive: true });
      await mkdir(join(this.config.backupDir, 'daily'), { recursive: true });
      await mkdir(join(this.config.backupDir, 'weekly'), { recursive: true });
      await mkdir(join(this.config.backupDir, 'monthly'), { recursive: true });
    } catch (error) {
      console.error('Erro ao criar diretórios de backup:', error);
      throw error;
    }
  }

  /**
   * Agenda um backup
   */
  async scheduleBackup(source: string, type: 'daily' | 'weekly' | 'monthly'): Promise<void> {
    this.backupQueue.push({ source, type });
    
    if (!this.isProcessing) {
      this.processBackupQueue();
    }
  }

  /**
   * Processa a fila de backups
   */
  private async processBackupQueue(): Promise<void> {
    if (this.isProcessing || this.backupQueue.length === 0) {
      return;
    }

    this.isProcessing = true;

    try {
      while (this.backupQueue.length > 0) {
        const backup = this.backupQueue.shift();
        if (backup) {
          await this.performBackup(backup.source, backup.type);
        }
      }
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Executa o backup
   */
  private async performBackup(source: string, type: 'daily' | 'weekly' | 'monthly'): Promise<void> {
    const timestamp = new Date();
    const backupFileName = this.generateBackupFileName(source, timestamp, type);
    const backupPath = join(this.config.backupDir, type, backupFileName);

    try {
      // Criar stream de leitura
      const sourceStream = createReadStream(source);
      
      // Criar pipeline de processamento
      let processStream = sourceStream;

      // Adicionar compressão se configurado
      if (this.config.compression) {
        processStream = processStream.pipe(createGzip());
      }

      // Criar stream de escrita
      const destinationStream = createWriteStream(backupPath);

      // Executar pipeline
      await pipeline(processStream, destinationStream);

      // Registrar metadata do backup
      const stats = await stat(backupPath);
      const metadata: BackupMetadata = {
        timestamp,
        type,
        size: stats.size,
        checksum: await this.calculateChecksum(backupPath),
        compressed: this.config.compression,
        encrypted: !!this.config.encryptionKey,
        sources: [source]
      };

      await this.saveBackupMetadata(backupFileName, metadata);
      
      // Limpar backups antigos
      await this.cleanupOldBackups(type);

    } catch (error) {
      console.error(`Erro ao realizar backup de ${source}:`, error);
      throw error;
    }
  }

  /**
   * Gera nome do arquivo de backup
   */
  private generateBackupFileName(source: string, timestamp: Date, type: string): string {
    const datePart = timestamp.toISOString().replace(/[:.]/g, '-');
    const sourceName = basename(source).replace(/[^a-zA-Z0-9]/g, '_');
    return `${sourceName}_${type}_${datePart}.backup${this.config.compression ? '.gz' : ''}`;
  }

  /**
   * Calcula checksum do arquivo
   */
  private async calculateChecksum(filePath: string): Promise<string> {
    // TODO: Implementar cálculo real de checksum
    return 'checksum-placeholder';
  }

  /**
   * Salva metadata do backup
   */
  private async saveBackupMetadata(backupFileName: string, metadata: BackupMetadata): Promise<void> {
    const metadataPath = join(this.config.backupDir, 'metadata', `${backupFileName}.json`);
    await mkdir(join(this.config.backupDir, 'metadata'), { recursive: true });
    
    const metadataContent = JSON.stringify(metadata, null, 2);
    await new Promise<void>((resolve, reject) => {
      createWriteStream(metadataPath)
        .write(metadataContent, (error) => {
          if (error) reject(error);
          else resolve();
        });
    });
  }

  /**
   * Remove backups antigos baseado na política de retenção
   */
  private async cleanupOldBackups(type: 'daily' | 'weekly' | 'monthly'): Promise<void> {
    const backupDir = join(this.config.backupDir, type);
    const files = await readdir(backupDir);
    const now = new Date();

    const retentionDays = {
      daily: this.config.retention.daily,
      weekly: this.config.retention.weekly * 7,
      monthly: this.config.retention.monthly * 30
    }[type];

    for (const file of files) {
      const filePath = join(backupDir, file);
      const stats = await stat(filePath);
      const ageInDays = (now.getTime() - stats.mtime.getTime()) / (1000 * 60 * 60 * 24);

      if (ageInDays > retentionDays) {
        try {
          await new Promise<void>((resolve, reject) => {
            unlink(filePath, (error) => {
              if (error) reject(error);
              else resolve();
            });
          });
        } catch (error) {
          console.error(`Erro ao remover backup antigo ${filePath}:`, error);
        }
      }
    }
  }

  /**
   * Restaura um backup
   */
  async restoreBackup(backupPath: string, destinationPath: string): Promise<void> {
    try {
      let sourceStream = createReadStream(backupPath);

      // Descomprimir se necessário
      if (backupPath.endsWith('.gz')) {
        sourceStream = sourceStream.pipe(createGunzip());
      }

      const destinationStream = createWriteStream(destinationPath);
      await pipeline(sourceStream, destinationStream);

    } catch (error) {
      console.error(`Erro ao restaurar backup ${backupPath}:`, error);
      throw error;
    }
  }

  /**
   * Lista backups disponíveis
   */
  async listBackups(type?: 'daily' | 'weekly' | 'monthly'): Promise<BackupMetadata[]> {
    const types = type ? [type] : ['daily', 'weekly', 'monthly'];
    const backups: BackupMetadata[] = [];

    for (const t of types) {
      const backupDir = join(this.config.backupDir, t);
      const files = await readdir(backupDir);

      for (const file of files) {
        try {
          const metadataPath = join(this.config.backupDir, 'metadata', `${file}.json`);
          const metadataContent = await new Promise<string>((resolve, reject) => {
            readFile(metadataPath, 'utf8', (error, data) => {
              if (error) reject(error);
              else resolve(data);
            });
          });
          
          backups.push(JSON.parse(metadataContent));
        } catch (error) {
          console.error(`Erro ao ler metadata do backup ${file}:`, error);
        }
      }
    }

    return backups.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  /**
   * Verifica integridade dos backups
   */
  async verifyBackups(): Promise<{
    total: number;
    verified: number;
    corrupted: number;
    details: Array<{ file: string; status: 'ok' | 'corrupted'; error?: string }>;
  }> {
    const results = {
      total: 0,
      verified: 0,
      corrupted: 0,
      details: []
    };

    const backups = await this.listBackups();

    for (const backup of backups) {
      results.total++;
      
      try {
        const currentChecksum = await this.calculateChecksum(
          join(this.config.backupDir, backup.type, basename(backup.sources[0]))
        );

        if (currentChecksum === backup.checksum) {
          results.verified++;
          results.details.push({
            file: backup.sources[0],
            status: 'ok'
          });
        } else {
          results.corrupted++;
          results.details.push({
            file: backup.sources[0],
            status: 'corrupted',
            error: 'Checksum mismatch'
          });
        }
      } catch (error) {
        results.corrupted++;
        results.details.push({
          file: backup.sources[0],
          status: 'corrupted',
          error: error.message
        });
      }
    }

    return results;
  }
} 