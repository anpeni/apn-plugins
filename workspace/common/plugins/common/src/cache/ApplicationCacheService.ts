import { CacheService } from './CacheService';
import { LoggerService } from '@backstage/backend-plugin-api';

export class ApplicationCacheService {
  private readonly cacheService: CacheService<any>;
  private readonly logger: LoggerService;

  constructor(cacheService: CacheService<any>, logger: LoggerService) {
    this.cacheService = cacheService;
    this.logger = logger;
    this.startCacheInvalidation();
  }

  setCache(key: string, data: any): void {
    this.cacheService.set(key, data);
    this.logger.info(`Data cached for key: ${key}`);
  }

  getCache(key: string): any | undefined {
    return this.cacheService.get(key);
  }

  clear(): void {
    this.cacheService.clear();
    this.logger.info('Cache cleared');
  }

  setProjectData(projectData: any): void {
    this.cacheService.set('projectData', projectData);
    this.logger.info('Project data saved to cache');
  }

  getProjectData(): any | undefined {
    return this.cacheService.get('projectData');
  }

  private startCacheInvalidation() {
    setInterval(() => {
      this.logger.info('Invalidating cache');
      this.cacheService.clear();
    }, 60 * 60 * 1000); // 1 hour
  }
}
