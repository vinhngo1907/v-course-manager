export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export enum S3Provider {
  AWS = 'aws',
  S3 = 's3',
  MinIO = 'minio',
  DigitalOcean = 'digitalocean',
  Wasabi = 'wasabi',
  Linode = 'linode',
  Backblaze = 'backblaze',
}

export type S3ChecksumMode = 'WHEN_REQUIRED' | 'WHEN_SUPPORTED';

export interface S3Config {
  provider: S3Provider;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  endpoint?: string;
  forcePathStyle?: boolean;
  maxFileSize?: number; // in bytes, default 10MB
  allowedFileTypes?: string[]; // array of allowed file extensions
  checksum: S3ChecksumMode; // checksum validation
}

export interface AppConfig {
  // Application
  env: Environment;
  appVersion?: string; // Optional version for the application
  app: {
    rssThreshold: number; // RSS memory threshold in MB
    heapThreshold: number; // Heap memory threshold in MB
    diskThreshold: number; // Disk storage threshold in percentage (0-100)
  };
  /**
   * Origins are separated by commas
   * @example 'http://localhost:3000,https://example.com'
   */
  corsAllowedOrigins: string;
  viasrApi: {
    url: string;
    key: string;
  };
  port: number;
  jwt: {
    secret: string;
    expiresIn?: string;
  };
  refreshToken?: {
    expirationDays?: string;
  };
  s3: S3Config;
  supabase: {
    url: string;
    anonKey: string;
    serviceRoleKey: string;
  };
  branch: {
    key: string;
    secret: string;
    webhookSecret?: string;
    webAppUrl: string;
    iosAppStoreUrl: string;
    androidPlayStoreUrl: string;
  };
  revenueCat: {
    projectId: string;
    secretKey: string;
    webhookSecret?: string;
  };
  rabbitmq: {
    url: string;
    queueName: string;
    exchange: string;
    exchangeType: string;
    consumerTag: string;
    articles: {
      inputQueue: string;
    };
  };
  oneSignal: {
    appId: string;
    restApiKey: string;
    userAuthKey?: string;
  };
  monitoring?: {
    excludedEndpoints?: string[]; // Endpoints to exclude from Prometheus monitoring
  };
  influxdb: {
    enabled?: boolean;
    url: string;
    token: string;
    org: string;
    bucket: string;
  };
  redis: {
    url: string;
  };
  statsig: {
    serverSecretKey: string;
    enabled?: boolean;
    /**
     * Optional: Override default fallback values for feature flags
     * Used when Statsig is unavailable or fails at runtime
     * If not specified, uses FeatureFlagDefaults from statsig.constants.ts
     */
    fallbackDefaults?: Record<string, boolean>;
  };
}
