import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
    const logger = new Logger();

    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('/api');
    const config = app.get<ConfigService>(ConfigService);
    app.useGlobalPipes(new ValidationPipe());

    const port = config.get('PORT');
    await app.listen(port, () => logger.log(`Server is listening on port ${port}`));
}

bootstrap();
