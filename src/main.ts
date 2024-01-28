import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);
    const port = config.get('PORT');
    app.useGlobalPipes(new ValidationPipe());

    const configSwagger = new DocumentBuilder()
        .setTitle('Lesson api')
        .setDescription('Api for lesson')
        .setVersion('1.0.0')
        .addTag('API')
        .build();

    const documentSwagger = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup('swagger', app, documentSwagger);

    await app.listen(port || 5000);
}
bootstrap();
