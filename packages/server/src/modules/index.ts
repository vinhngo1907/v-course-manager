import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
// import { AppController } from '../app.controller';
// import { AppService } from '../app.service';
import { DatabaseModule } from './database';
import { AppConfigModule } from 'src/config';
import { LoggerMiddleware } from 'src/common/middlewares/loggerMiddleware';
import { UserModule } from 'src/modules/user';
import { AuthModule } from 'src/modules/auth';

@Module({
	imports: [
		AppConfigModule,
		DatabaseModule,
		UserModule,
		AuthModule
	],
	controllers: [],
	providers: [Logger],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
