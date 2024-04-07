import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/modules';
import { AppConfigService } from './config/service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DatabaseService } from '@modules/database/service';
import { AppLoggerService } from './common/logger/service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
	const prismaSerivce = app.get(DatabaseService);
	prismaSerivce.$connect();

	const logger = app.get(AppLoggerService);
	app.useLogger(logger);
  
	const port = appConfigService.port;
  
	setupSwagger(app);
  
	await app.listen(port, () => {
	  logger.log(`Server is running on port ${port}`, 'Bootstrap');
	});
  
	await prismaSerivce.enableShutdownHooks(app);
}

bootstrap();

function setupSwagger(app: INestApplication) {
	const config = new DocumentBuilder()
	  .setTitle('Book auth example')
	  .setDescription('The book auth API description')
	  .setVersion('1.0')
	  .addTag('auth')
	  .build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);
  }
  

export const SRC_DIR = __dirname