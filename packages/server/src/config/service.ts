import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
	constructor(
		private readonly env: { [k: string]: string | undefined },
		private readonly configService: ConfigService
	) { }
	
	private getValue(key: string, throwOnMissing = true): string {
		const value = this.env[key];
		if(!value && throwOnMissing){
			throw new Error(`Config error = missing env.${key}`);
		}

		return value;
	}

	public get port(): number {
		return this.configService.get('PORT') || 3333;
	}

	public ensureValues(keys: string[]){
		keys.forEach((k) => this.getValue(k,true));
	}

	public getAdminPassword():string{
		return this.getValue('ADMIN_PASSWORD');
	}
}
