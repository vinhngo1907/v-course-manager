import { AppConfig, Environment } from "src/common/types/app-config";

export default (): Partial<AppConfig> => ({
    env: (process.env.NODE_ENV as Environment) || Environment.Development,
    port: parseInt(process.env.PORT || '3001', 10),
    app: {
        rssThreshold: parseInt(process.env.APP_RSS_THRESHOLD!, 10),
        heapThreshold: parseInt(process.env.APP_HEAP_THRESHOLD!, 10),
        diskThreshold: parseFloat(process.env.APP_DISK_THRESHOLD!),
    },
    appVersion: process.env.APP_VERSION,
    viasrApi: {
        key: process.env.VIASR_API_KEY!,
        url: process.env.VIASR_API_URL!,
    },
    supabase: {
        url: process.env.SUPABASE_URL!,
        anonKey: process.env.SUPABASE_ANON_KEY!,
        serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    },
    branch: {
        key: process.env.BRANCH_IO_KEY!,
        secret: process.env.BRANCH_IO_SECRET!,
        webhookSecret: process.env.BRANCH_WEBHOOK_SECRET,
        webAppUrl: process.env.BRANCH_IO_WEB_APP_URL!,
        iosAppStoreUrl: process.env.BRANCH_IO_IOS_APP_STORE_URL!,
        androidPlayStoreUrl: process.env.BRANCH_IO_ANDROID_PLAY_STORE_URL!,
    },
    revenueCat: {
        projectId: process.env.REVENUECAT_PROJECT_ID!,
        secretKey: process.env.REVENUECAT_SECRET_KEY!,
        webhookSecret: process.env.REVENUECAT_WEBHOOK_SECRET,
    },
    rabbitmq: {
        url: process.env.RABBITMQ_URL!,
        queueName: process.env.RABBITMQ_QUEUE_NAME || 'murror.main.queue',
        exchange: 'murror.main.direct',
        exchangeType: 'direct',
        consumerTag: 'murror.main.consumer',
        articles: {
            inputQueue: process.env.RABBITMQ_ARTICLES_INPUT_QUEUE!,
        },
    },
    oneSignal: {
        appId: process.env.ONESIGNAL_APP_ID!,
        restApiKey: process.env.ONESIGNAL_REST_API_KEY!,
    },
    monitoring: {
        excludedEndpoints: process.env.MONITORING_EXCLUDED_ENDPOINTS
            ? process.env.MONITORING_EXCLUDED_ENDPOINTS.split(',').map(e => e.trim())
            : [],
    },
    influxdb: {
        enabled: process.env.INFLUXDB_ENABLED !== 'false', // Default to true unless explicitly set to 'false'
        url: process.env.INFLUXDB_URL || '',
        token: process.env.INFLUXDB_TOKEN || '',
        org: process.env.INFLUXDB_ORG || '',
        bucket: process.env.INFLUXDB_BUCKET || '',
    },
    redis: {
        url: process.env.REDIS_URL!,
    },
    statsig: {
        serverSecretKey: process.env.STATSIG_SERVER_SECRET_KEY!,
        enabled: process.env.STATSIG_ENABLED !== 'false', // Default to true unless explicitly disabled
        // Optional: Override fallback defaults via environment variables
        // Format: STATSIG_FALLBACK_DEFAULTS={"article_push_notifications":true}
        fallbackDefaults: process.env.STATSIG_FALLBACK_DEFAULTS
            ? (JSON.parse(process.env.STATSIG_FALLBACK_DEFAULTS) as Record<
                string,
                boolean
            >)
            : undefined,
    },
    corsAllowedOrigins: process.env.CORS_ALLOWED_ORIGINS || '*',
    // jwt: {
    //   secret: process.env.JWT_SECRET!,
    //   expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    // },
    // s3: {
    //   provider: (process.env.S3_PROVIDER as S3Provider) || S3Provider.AWS,
    //   region: process.env.S3_REGION || 'us-east-1',
    //   accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    //   secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    //   bucketName: process.env.S3_BUCKET_NAME || '',
    //   endpoint: process.env.S3_ENDPOINT,
    //   forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
    //   maxFileSize: parseInt(process.env.S3_MAX_FILE_SIZE || '10485760', 10), // 10MB default
    //   allowedFileTypes: process.env.S3_ALLOWED_FILE_TYPES
    //     ? process.env.S3_ALLOWED_FILE_TYPES.split(',')
    //     : [
    //         'jpg',
    //         'jpeg',
    //         'png',
    //         'gif',
    //         'pdf',
    //         'doc',
    //         'docx',
    //         'xls',
    //         'xlsx',
    //         'txt',
    //         'csv',
    //       ],
    //   checksum:
    //     process.env.S3_CHECKSUM === 'false' ? 'WHEN_REQUIRED' : 'WHEN_SUPPORTED',
    // },
});
