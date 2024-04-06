import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from '../app.controller';
// import { AppService } from '../app.service';
import { DatabaseModule } from './database';
import { AppConfigModule } from 'src/config';
import { LoggerMiddleware } from 'src/common/middlewares/loggerMiddleware';

@Module({
	imports: [
		AppConfigModule,
		DatabaseModule],
	controllers: [AppController],
	providers: [],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
