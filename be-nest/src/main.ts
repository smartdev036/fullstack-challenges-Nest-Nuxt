import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // CORS
    app.enableCors({
        origin: ['http://localhost:3000', 'http://localhost:3044', 'https://ambisius.udaputera.com'],
        credentials: true
    });

    const port = 5003
    await app.listen(port);
    console.log(`App is running at http://localhost:${port}`)
}
bootstrap();
