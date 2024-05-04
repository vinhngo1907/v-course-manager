import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { configKeys } from './constants';

@Injectable()
export class AppConfigService {
	constructor(
		// private readonly env: { [k: string]: string | undefined },
		private readonly configService: ConfigService
	) { }

	private getValue(key: string, throwOnMissing = true): string {
		const value = this.configService[key];
		if (!value && throwOnMissing) {
			throw new Error(`Config error = missing env.${key}`);
		}

		return value;
	}

	public get port(): number {
		return this.configService.get(configKeys.HTTP_SERVER_PORT) || 3333;
	}

	// public ensureValues(keys: string[]) {
	// 	keys.forEach((k) => this.getValue(k, true));
	// }

	public getAdminPassword(): string {
		// return this.getValue('ADMIN_PASSWORD');
		return this.configService.get(configKeys.ADMIN_PASSWORD);
	}

	public getClientUr(): string {
		return "";
	}
}

// const appConfigService = new AppConfigService(process.env, new ConfigService());
// const requiredEnvVariables = [
// 	'POSTGRES_HOST',
// 	'POSTGRES_PORT',
// 	'POSTGRES_USER',
// 	'POSTGRES_PASSWORD',
// 	'POSTGRES_DATABASE',
// 	'JWT_SECRET',
// 	'JWT_EXPIRATION_TIME',
// ];

// appConfigService.ensureValues(requiredEnvVariables);

// export { appConfigService }