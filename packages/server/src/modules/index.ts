import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
// import { AppController } from '../app.controller';
// import { AppService } from '../app.service';
import { DatabaseModule } from './database';
import { AppConfigModule } from 'src/config';
import { LoggerMiddleware } from 'src/common/middlewares/loggerMiddleware';
import { UserModule } from 'src/modules/user';
import { AuthModule } from 'src/modules/auth';
import { AccountModule } from 'src/modules/account';
import { RoleModule } from 'src/modules/role';
import { LoggerModule } from 'src/common/logger';

@Module({
	imports: [
		AppConfigModule,
		DatabaseModule,
		UserModule,
		AuthModule,
		AccountModule,
		RoleModule,
		LoggerModule
	],
	providers: [Logger],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
