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
        const expiresIn = this.getValue(configKeys.JWT_EXPIRATION_TIME, false) || '60s';
        // console.log(`JWT Config - Secret: ${secret}, Expires In: ${expiresIn}`);
        return {
            secret: `${secret}`,
            signOptions: {
                expiresIn: `${expiresIn}s`,
            },
        };
	}
}