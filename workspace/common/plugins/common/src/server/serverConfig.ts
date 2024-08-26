import { Config } from '@backstage/config';

export interface BackendConfig {
  port: number;
  enableCors: boolean;
  baseUrl: string;
  token: string;
}

export function getBackendConfig(config: Config): BackendConfig {
  const backendConfig = config.getConfig('backend');
  const port = backendConfig.getOptionalNumber('listen.port') ?? 7007;
  const baseUrl = backendConfig.getString('baseUrl');

  const authConfigArray = backendConfig
    .getConfig('auth')
    .getConfigArray('externalAccess');
  const staticAuthConfig = authConfigArray.find(
    auth => auth.getString('type') === 'static',
  );

  if (!staticAuthConfig) {
    throw new Error('Static auth configuration not found');
  }

  const authOptions = staticAuthConfig.getConfig('options');
  const token = authOptions.getString('token');

  const enableCors = true;

  console.info(
    `BackendConfig: port=${port}, enableCors=${enableCors}, baseUrl=${baseUrl}`,
  );

  return { port, enableCors, baseUrl, token };
}
