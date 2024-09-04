import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('API Doc - Ambisius - Rizjami Putera')
        .setDescription(
            'Applying for [Hybrid Full-time] Frontend / Backend / Full Stack TypeScript Developer',
        )
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    // CORS
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://localhost:3044',
            'https://ambisius.udaputera.com',
        ],
        credentials: true,
    });

    const port = 5003;
    await app.listen(port);
    console.log(`App is running at http://localhost:${port}`);
}
bootstrap();
