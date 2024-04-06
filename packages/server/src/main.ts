import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/modules';
import { AppConfigService } from './config/service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
		}),
	);

	// app.useGlobalFilters(new HttpExceptionFilter());

	const appConfigService = app.get(AppConfigService);
	await app.listen(3000);
}
bootstrap();

export const SRC_DIR = __dirname