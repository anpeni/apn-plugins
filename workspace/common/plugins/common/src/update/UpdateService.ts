import { IApplicationService } from '../types/interfaces';
import { LoggerService } from '@backstage/backend-plugin-api';
import { ApplicationCacheService } from '../cache/ApplicationCacheService';

export class UpdateService {
  private readonly applicationService: IApplicationService;
  private readonly logger: LoggerService;
  private readonly cacheService: ApplicationCacheService;

  constructor(
    applicationService: IApplicationService,
    logger: LoggerService,
    cacheService: ApplicationCacheService,
  ) {
    this.applicationService = applicationService;
    this.logger = logger;
    this.cacheService = cacheService;
  }

  async updateProjectData() {
    this.logger.info('Updating project data...');
    const projectData = await this.applicationService.getProjectData();
    this.cacheService.setProjectData(projectData);
    this.logger.info('Project data updated and cached');
    return projectData;
  }

  getCachedProjectData() {
    return this.cacheService.getProjectData();
  }
}
