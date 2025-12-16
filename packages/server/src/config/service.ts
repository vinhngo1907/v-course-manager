import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { configKeys } from './constants';

@Injectable()
export class AppConfigService {
  constructor(
    // private readonly env: { [k: string]: string | undefined },
    private readonly configService: ConfigService,
  ) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.configService.get(configKeys[key]);
    if (!value && throwOnMissing) {
      throw new Error(`Config error = missing env.${key}`);
    }

    return value;
  }

  public get port(): number {
    return this.configService.get(configKeys.HTTP_SERVER_PORT) || 3333;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
  }

  public getAdminPassword(): string {
    // return this.getValue('ADMIN_PASSWORD');
    return this.configService.get(configKeys.ADMIN_PASSWORD);
  }

  public getClientUrl(): string {
    return this.configService.get(configKeys.CLIENT_URL);
  }

  public isProduction() {
    const mode = this.getValue(configKeys.MODE, false);
    return mode != 'DEV';
  }

  public getJwtConfig(): JWT_CONFIG {
    const secret = this.getValue(configKeys.JWT_SECRET);
    const expiresIn =
      this.getValue(configKeys.JWT_EXPIRATION_TIME, false) || '60s';
    // console.log(`JWT Config - Secret: ${secret}, Expires In: ${expiresIn}`);
    return {
      secret: `${secret}`,
      signOptions: {
        expiresIn: `${expiresIn}s`,
      },
    };
  }

  public getCorsConfig() {
    const isProd = this.isProduction();

    return {
      origin: isProd ? this.getClientUrl() : ['http://localhost:3000'],
      methods: 'GET,HEAD,POST,PUT,DELETE,PATCH,OPTIONS',
      credentials: true,
    };
  }

  public getCorsAllowedOrigins() {
    return this.getValue(configKeys.CORS_ALLOWED_ORIGINS);
  }

  public getMinioConfig() {
    return {
      endPoint: this.getValue(configKeys.MINIO_ENDPOINT),
      port: Number(this.getValue(configKeys.MINIO_PORT)),
      useSSL: this.getValue(configKeys.MINIO_USE_SSL) === 'true',
      accessKey: this.getValue(configKeys.MINIO_ACCESS_KEY),
      secretKey: this.getValue(configKeys.MINIO_SECRET_KEY),
      bucket: this.getValue(configKeys.MINIO_BUCKET_NAME),
      publicUrl: this.getValue(configKeys.MINIO_PUBLIC_URL),
      folder: this.getValue(configKeys.MINIO_FOLDER),
    };
  }

  public getLivekitConfig() {
    return {
      host: this.getValue(configKeys.LIVEKIT_URL),
      apiKey: this.getValue(configKeys.LIVEKIT_API_KEY),
      apiSecret: this.getValue(configKeys.LIVEKIT_API_SECRET),
    };
  }
}
